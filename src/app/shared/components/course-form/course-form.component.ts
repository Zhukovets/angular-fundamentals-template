import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
      newAuthor: this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      }),
      duration: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor(): void {
    const authorName = this.courseForm.get('newAuthor.name')?.value;
    if (authorName && this.courseForm.get('newAuthor.name')?.valid) {
      this.authors.push(this.fb.control(authorName));
      this.courseForm.get('newAuthor.name')?.reset();
    }
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
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
