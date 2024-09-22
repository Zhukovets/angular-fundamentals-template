import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }  
courseForm!: FormGroup;

ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      author: [''],
      authors: this.fb.array([]), 
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor() {
    const authorName = this.courseForm.get('author')?.value;
    if (authorName) {
      this.authors.push(this.fb.control(authorName, Validators.required));
      this.courseForm.get('author')?.reset();
    }
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    }
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.

}
