import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  isEdit = false;
  courseId: string | null = null;
  isSubmitting = false;
  allAuthorsList: Array<{ id: string; name: string }> = [];

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStore: CoursesStoreService
  ) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ['', [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9 ]+$/)]],
      courseAuthors: this.fb.array([]),
      duration: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.courseId;

    this.coursesStore.getAllAuthors().pipe(take(1)).subscribe({
      next: (res: any) => {
        this.allAuthorsList = (res?.result ?? res) || [];
        if (this.isEdit && this.courseId) {
          this.loadCourseAndFill(this.courseId);
        }
      },
      error: () => {
        this.allAuthorsList = [];
        if (this.isEdit && this.courseId) {
          this.loadCourseAndFill(this.courseId);
        }
      }
    });
  }

  private loadCourseAndFill(id: string) {
    this.coursesStore.getCourse(id).pipe(take(1)).subscribe({
      next: (res: any) => {
        const course = res?.result ?? res ?? {};
        const title = course?.title ?? '';
        const description = course?.description ?? '';
        const duration = course?.duration ?? 0;
        const authorsFromApi = course?.authors ?? []; 

        this.courseForm.patchValue({ title, description, duration });

        const nameToId = new Map(this.allAuthorsList.map(a => [a.name, a.id] as const));
        const ids: string[] = (authorsFromApi || []).map((a: any) => {
          const foundById = this.allAuthorsList.find(x => x.id === a);
          if (foundById) return a;
          const idByName = nameToId.get(String(a));
          return idByName ?? String(a);
        });

        const ca = this.courseAuthors;
        while (ca.length) ca.removeAt(0);
        for (const idVal of ids) ca.push(this.fb.control(idVal));
      },
      error: () => {
        alert('Load course failed');
        this.router.navigate(['/courses']);
      }
    });
  }

  // ---------- getters ----------
  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get courseAuthorsControls(): FormControl[] {
    return this.courseAuthors.controls as FormControl[];
  }

  get authorControl(): FormControl {
    return this.courseForm.get('author') as FormControl;
  }

  // ---------- utility ----------
  getAuthorNameById(id: string): string {
    const found = this.allAuthorsList.find(a => a.id === id);
    return found ? found.name : id;
  }

  // ---------- server actions ----------
  addAuthor(): void {
    const name = (this.authorControl.value as string)?.trim();
    if (!name) return;

    this.coursesStore.createAuthor(name).pipe(take(1)).subscribe({
      next: (res: any) => {
        // reload authors from server to get new id
        this.coursesStore.getAllAuthors().pipe(take(1)).subscribe((r: any) => {
          this.allAuthorsList = (r?.result ?? r) || [];
          this.authorControl.reset();
        });
      },
      error: () => alert('Create author failed')
    });
  }

  addServerAuthor(index: number): void {
    const a = this.allAuthorsList[index];
    if (!a) return;
    const already = this.courseAuthors.controls.some(c => c.value === a.id);
    if (!already) {
      this.courseAuthors.push(this.fb.control(a.id));
    }
  }
  removeAuthorFromCourse(index: number): void {
    if (index < 0 || index >= this.courseAuthors.length) return;
    this.courseAuthors.removeAt(index);
  }

  deleteServerAuthor(index: number): void {
    const a = this.allAuthorsList[index];
    if (!a) return;
    if (!confirm(`Delete author "${a.name}"? This will remove author from server.`)) return;

    this.coursesStore.deleteAuthor(a.id).pipe(take(1)).subscribe({
      next: () => {
        this.coursesStore.getAllAuthors().pipe(take(1)).subscribe((r: any) => {
          this.allAuthorsList = (r?.result ?? r) || [];
          for (let i = this.courseAuthors.length - 1; i >= 0; i--) {
            const val = this.courseAuthors.at(i).value;
            if (!this.allAuthorsList.find(x => x.id === val)) {
              this.courseAuthors.removeAt(i);
            }
          }
        });
      },
      error: () => alert('Delete author failed')
    });
  }

  submit(): void {
    this.submitted = true;
    if (this.courseForm.invalid) return;

    this.isSubmitting = true;
    const payload = {
      title: this.courseForm.get('title')?.value,
      description: this.courseForm.get('description')?.value,
      duration: this.courseForm.get('duration')?.value,
      authors: this.courseAuthors.controls.map(c => c.value),
    };

    if (this.isEdit && this.courseId) {
      this.coursesStore.editCourse(this.courseId, payload).pipe(take(1)).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/courses']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Update failed');
        }
      });
    } else {
      this.coursesStore.createCourse(payload).pipe(take(1)).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/courses']);
        },
        error: () => {
          this.isSubmitting = false;
          alert('Create failed');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
