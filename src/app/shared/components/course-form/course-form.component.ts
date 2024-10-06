import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CourseFormComponent implements OnInit{
  courseForm!: FormGroup;
  formFields = {
    title: 'title',
    description: 'description',
    duration: 'duration',
    newAuthor: 'newAuthor',
    authorName: 'name',
  }
  editCourse: Course | null = null;
  allAuthors: Author[] = [];

  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
    private route: ActivatedRoute,
    private coursesStoreService: CoursesStoreService,
    private coursesService: CoursesService,
    private router: Router
  ) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  ngOnInit(): void {
    let courseId = this.route.snapshot.paramMap.get('id');
    
    this.coursesStoreService.authors$.subscribe((authors) => {
      this.allAuthors = authors;
      if(!courseId){
        this.populateAuthors(this.allAuthors);
      }
    });

    if(courseId){
      this.coursesStoreService.getCourse(courseId);
      this.coursesStoreService.course$.subscribe((course) => {
        if (course) {
          this.editCourse = course;
          this.resolveAuthorIds(course.authors).subscribe((resolvedAuthors) => {
            this.patchFormValues(course, resolvedAuthors);
            this.populateAuthors(resolvedAuthors);
          });
        }
      });
    }
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get titleControl(): FormControl{
    return this.courseForm.get(this.formFields.title)! as FormControl;
  }

  get descriptionControl(): FormControl{
    return this.courseForm.get(this.formFields.description)! as FormControl;
  }

  get durationControl(): FormControl{
    return this.courseForm.get(this.formFields.duration)! as FormControl;
  }

  get newAuthorGroup(): FormGroup{
    return this.courseForm.get(this.formFields.newAuthor)! as FormGroup;
  }

  get newAuthorNameControl(): FormControl{
    return this.courseForm.get(this.formFields.newAuthor)?.get(this.formFields.authorName)! as FormControl;
  }

  addAuthor(): void {
    const authorName = this.newAuthorNameControl?.value;
  
    if (authorName && this.newAuthorGroup?.valid) {
      this.coursesStoreService.createAuthor(authorName).subscribe({
        next: (response) => {
          if (response.successful && response.result) {
            const authorId = response.result.id;
            this.authors.push(this.fb.group({
              id: [authorId],
              name: [authorName]
            }));
            this.newAuthorNameControl?.setValue('');
          } else {
            console.error('Failed to create author:', response.message);
          }
        },
        error: (error) => {
          console.error('Error creating author:', error);
        }
      });
    }
  }
  

  addAuthorToCourseAuthor(index: number): void {
    this.courseAuthors.push(this.authors.at(index));
    this.authors.removeAt(index);
  }

  removeAuthor(index: number,id: string): void {
    this.authors.removeAt(index);
    this.coursesService.deleteAuthor(id).subscribe({
      next: (response) => {
        if(response.successful) {
          console.log('Author deleted successfully...')
        }
      },
      error: (error) => {
        console.error('Error deleting author:', error);
      }
    });
  }

  removeCourseAuthor(index: number): void {
    this.authors.push(this.courseAuthors.at(index));
    this.courseAuthors.removeAt(index);
  }

  clearAuthorsAndCourseAuthors(): void {
    this.authors.clear();
    this.courseAuthors.clear();
  }

  formReset(): void {
    this.courseForm.reset();
    this.clearAuthorsAndCourseAuthors();
  }

  trackByFn(index: any, item: any) {
    return item.id;
  }
  
  buildForm(): void {
    this.courseForm = this.fb.group({
      [this.formFields.title]: ['', [Validators.required, Validators.minLength(2)]],
      [this.formFields.description]: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      [this.formFields.newAuthor]: this.fb.group({
        [this.formFields.authorName]: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]], // name control
      }),
      [this.formFields.duration]: ['', [Validators.required, Validators.min(0)]],
    });
  }

  resolveAuthorIds(authorIds: string[]): Observable<Author[]> {
    const authorObservables = authorIds.map((id) => 
      this.coursesStoreService.getAuthorById(id).pipe(
        map(response => response.result)
      )
    );

    return forkJoin(authorObservables);
  }

  // Populate authors FormArray with all authors except those already in courseAuthors
  populateAuthors(excludedAuthors: Author[]): void {
    this.coursesStoreService.authors$.subscribe(allAuthors => {
      const existingAuthorIds = this.courseAuthors.controls.map(control => control.value.id);

      this.authors.clear();

      allAuthors.forEach(author => {
        if (!existingAuthorIds.includes(author.id)) {
          this.authors.push(this.fb.group({
            id: [author.id],
            name: [author.name],
          }));
        }
      });
    });
  }

  patchFormValues(course: Course, authors: Author[]): void {
    this.courseForm.patchValue({
      [this.formFields.title]: course.title,
      [this.formFields.description]: course.description,
      [this.formFields.duration]: course.duration,
    });

    //Adding to CourseAuthors
    authors.forEach((author) => {
      const existingAuthor = this.courseAuthors.controls.find((control) => {
        return control.value.id === author.id;
      });

      if (!existingAuthor) {
        this.courseAuthors.push(this.fb.group({
          id: [author.id],
          name: [author.name],
        }));
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Form Submitted', this.courseForm.value);
      
      const authorIds = this.courseAuthors.controls.map(control => control.value.id);
  
      const submittedCourse: Course = {
        title: this.titleControl.getRawValue(),
        description: this.descriptionControl.getRawValue(),
        duration: this.durationControl.getRawValue(),
        authors: authorIds
      };
  
      if (this.editCourse) {
        this.coursesStoreService.editCourse(this.editCourse.id!, submittedCourse).subscribe({
          next: (response) => {
            if (response.successful) {
              console.log('Course updated successfully:', response.result);
              this.router.navigate(['']);
            } else {
              console.error('Failed to update course:', response.message || 'Unknown error');
            }
          },
          error: (error) => {
            console.error('Error updating course:', error);
          }
        });
      } else {
        this.coursesStoreService.createCourse(submittedCourse).subscribe({
          next: (response) => {
            if (response.successful) {
              console.log('Course created successfully:', response.result);
              this.router.navigate(['']);
            } else {
              console.error('Failed to create course:', response.message || 'Unknown error');
            }
          },
          error: (error) => {
            console.error('Error creating course:', error);
          }
        });
      }
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
  

}
