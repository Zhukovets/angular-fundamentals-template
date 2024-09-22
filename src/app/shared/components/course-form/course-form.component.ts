import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, FormArray, FormControl
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  isSubmitted = false;
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: ["", [Validators.pattern(/^[a-zA-Z0-9\s]+$/), Validators.minLength(2)]],
      authors: this.fb.array([]),
      course_authors: this.fb.array([]),
      duration: ["", [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get course_authors(): FormArray {
    return this.courseForm.get('course_authors') as FormArray;
  }

  createAuthor(): void {
    const authorVal = this.courseForm.controls["author"].value;

    if(!!authorVal){
      this.authors.push(this.fb.group({
        id: uuidv4(),
        name: [this.courseForm.controls["author"].value]
      }))
      
      this.courseForm.get('author')?.setValue('')
    } else {
      this.courseForm.get('author')?.setErrors({
        noValue: 'No author name was provided.'
      })
    }
  }

  addAuthor(index: number): void {
    const requestedAuthor = this.authors.at(index);
    
    if (requestedAuthor) {
      this.course_authors.push(requestedAuthor);
      this.authors.removeAt(index);
    }
  }

  removeAuthor(index: number): void {
    const requestedAuthor = this.course_authors.at(index);
    
    if (requestedAuthor) {
      this.authors.push(requestedAuthor);
      this.course_authors.removeAt(index);
    }
  }

  addAuthorToCourse(index: number): void {
    console.log(this.authors);
  }

  onSubmit() {
    this.isSubmitted = true;
    
    if (this.courseForm.valid) {
      console.log('Form submitted successfully', this.courseForm.value);
      this.isSubmitted = true;
    } else {
      console.log("From couldn't be submitted",this.courseForm);
    }
  }
}
