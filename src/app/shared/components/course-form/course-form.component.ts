import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService, Course } from '../../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  formErrors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });

  }
  isEdit = false;
  editingId: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;
    this.editingId = id;

    if (id) {
      this.coursesService.getCourse(id).subscribe(course => {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration
        });

        course.authors.forEach(authorId => {
          this.courseAuthors.push(this.fb.group({ id: [authorId], name: [''] }));
        });
      });
    }
    this.coursesService.getAllAuthors().subscribe(authors => {
      authors.forEach(a => this.authors.push(this.fb.group(a)));
    });

  }

  get title() { return this.courseForm.get('title') as FormControl; }
  get description() { return this.courseForm.get('description') as FormControl; }
  get duration() { return this.courseForm.get('duration') as FormControl; }
  get author() { return this.courseForm.get('author') as FormControl; }
  get authors() { return this.courseForm.get('authors') as FormArray; }
  get courseAuthors() { return this.courseForm.get('courseAuthors') as FormArray; }

  addAuthor(index: number) {
    const authorGroup = this.authors.at(index);
    if (authorGroup) {
      const author = { ...authorGroup.value };
      this.courseAuthors.push(this.fb.group(author));
      this.authors.removeAt(index);
    }
  }

  removeAuthor(index: number) {
    const authorGroup = this.courseAuthors.at(index);
    if (authorGroup) {
      const author = { ...authorGroup.value };
      this.authors.push(this.fb.group(author));
      this.courseAuthors.removeAt(index);
    }
  }

  isValidAuthorName(name: string): boolean {
    return /^[a-zA-Z0-9\s]+$/.test(name);
  }

  createAuthor() {
    const authorControl = this.author;
    if (!authorControl.value || authorControl.invalid) {
      authorControl.markAsTouched();
      this.formErrors['author'] = 'Author name is invalid';
      return;
    }
    this.coursesService.createAuthor(authorControl.value).subscribe(author => {
      this.authors.push(this.fb.group(author));
      authorControl.reset();
      this.formErrors['author'] = '';
    });
  }


  validateForm() {
    this.formErrors = {};
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      if (control && control.invalid && (control.dirty || control.touched || this.submitted)) {
        if (control.errors?.['required']) {
          this.formErrors[key] = `${key} is required`;
        } else if (control.errors?.['minlength']) {
          const minLength = control.errors['minlength'];
          this.formErrors[key] = `${key} must be at least ${minLength.requiredLength} characters`;
        } else if (control.errors?.['pattern']) {
          if (key === 'author') {
            this.formErrors[key] = 'Author name should contain only latin letters and numbers';
          } else {
            this.formErrors[key] = `${key} contains invalid characters`;
          }
        }
      }
    });
  }



  formatDuration(v: any): string {
    const n = Number(v) || 0;
    const h = Math.floor(n / 60);
    const m = n % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }


  onSubmit() {
    this.submitted = true;
    this.validateForm();

    if (!this.courseForm.valid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.title.value,
      description: this.description.value,
      duration: Number(this.duration.value) || 0,
      authors: this.courseAuthors.value.map((x: any) => x.id),
    };

    if (this.isEdit && this.editingId) {
      this.coursesService.editCourse(this.editingId, payload).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.coursesService.createCourse(payload).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    }
  }
}