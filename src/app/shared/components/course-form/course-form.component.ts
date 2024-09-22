import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      author: this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      }),
      duration: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  addAuthor(): void {
    const nestedGroup = this.courseForm.get('author') as FormGroup;
    const newAuthorControl = this.courseForm.get('author')?.get('name');
    const authorName = newAuthorControl?.value;
    const authorId = uuidv4();

    if (authorName && nestedGroup?.valid) {
      this.courseAuthors.push(this.fb.group({
        id: [authorId],
        name: [authorName]
      }));
      this.authors.push(this.fb.group({
        id: [authorId],
        name: [authorName]
      }));
      newAuthorControl?.setValue('');
    }
    nestedGroup.markAllAsTouched();
  }

  removeAuthor(index: number): void {
    console.log('author removed');
    this.authors.removeAt(index);
  }

  removeCourseAuthor(index: number): void {
    console.log('course author removed');
    this.courseAuthors.removeAt(index);
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      console.log('Form Submitted', this.courseForm.value);
      // Handle form submission logic
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

}
