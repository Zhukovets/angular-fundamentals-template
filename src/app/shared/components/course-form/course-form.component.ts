import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import { v4 as uuid } from 'uuid';

import { Author } from '@app/shared/models/author';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Course } from '@app/shared/models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isSubmittingForm: boolean = false;
  allAuthors: Author[] = [];
  editedCourse: Course | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseStore: CoursesStoreService,
    public fb: FormBuilder,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
    this.courseForm = this.fb.group({
      title: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      description: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      newAuthor: this.fb.group({
        author: this.fb.control('', [Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.minLength(2)])
      }),
      duration: this.fb.control('', [Validators.required, Validators.min(0)]),
      authors: this.fb.array([])
    });
    this.loadAuthors();

    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {// editing course
      this.courseStore.getCourse(courseId).subscribe((course: Course) => {
        this.editedCourse = course;
        this.courseForm.get('title')?.setValue(course.title);
        this.courseForm.get('description')?.setValue(course.title);
        this.courseForm.get('duration')?.setValue(course.duration);
        course.authors.forEach(author => {
          const idx = this.allAuthors.findIndex(x => x.name == author);
          this.addAsCourseAuthor(idx);
        });
      });
    }
  }

  loadAuthors() {
    this.courseStore.getAllAuthors().subscribe(authors => this.allAuthors = authors);
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get duration() {
    return this.courseForm.get('duration')?.value;
  }

  createAuthor() {
    const authorControl = this.courseForm.get('newAuthor.author') as FormControl;
    authorControl.markAsTouched({ onlySelf: true });

    if (authorControl.valid && authorControl.value) {
      this.courseStore.createAuthor(authorControl.value).subscribe(result => {
        if (result) {
          authorControl.setValue('');
          this.loadAuthors();
        }
      });
    }
  }

  addAsCourseAuthor(index: number) {
    this.authors.push(this.fb.control(this.allAuthors[index]));
    this.allAuthors.splice(index, 1);
  }

  removeAuthor(index: number) {
    const author = this.allAuthors.splice(index, 1);
    this.courseStore.deleteAuthor(author[0].name).subscribe(x => this.loadAuthors());
  }

  removeAsCourseAuthor(index: number) {
    const author: Author = this.authors.at(index).value as Author;
    this.authors.removeAt(index);
    this.allAuthors.push(author);
  }

  onSubmit() {
    this.isSubmittingForm = true;
    Object.keys(this.courseForm.controls).forEach(name => {
      const control = this.courseForm.controls[name];
      control.markAsTouched({ onlySelf: true });
    });

    if (this.courseForm.valid) {
      const date = new Date();
      const course: Course = {
        title: this.courseForm.get('title')?.value,
        description: this.courseForm.get('description')?.value,
        duration: this.courseForm.get('duration')?.value,
        creationDate: this.editedCourse? this.editedCourse.creationDate : new DatePipe('en-US').transform(date, 'M/d/YYYY')?.toString() || '',
        authors: this.authors.controls.map(c => c.value.id)
      }
      if (this.editedCourse) {
        this.courseStore.editCourse(this.editedCourse.id, course).subscribe((result: Course) => {
          if (result) {
            this.router.navigate(['courses']);
          }
        });
      }
      else {
        this.courseStore.createCourse(course).subscribe((result: Course) => {
          if (result) {
            this.router.navigate(['courses']);
          }
        });  
      }
    }
    this.isSubmittingForm = false;
  }

  isFieldValid(name: string, property: string): boolean {
    const control = this.courseForm.get(name);
    const formControl: FormControl = control as FormControl;
    return (this.isSubmittingForm || formControl.touched) && formControl.errors?.[property];
  }
}