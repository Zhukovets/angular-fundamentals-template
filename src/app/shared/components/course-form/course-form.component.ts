import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators
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
  submitted = false;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      authors: [[], Validators.required],  
      duration: ['', [Validators.required, Validators.pattern(/^\d+$/)]]  
    });
}
get title() {
  return this.courseForm.get('title');
}

get description() {
  return this.courseForm.get('description');
}

get author() {
  return this.courseForm.get('author');
}

get authors() {
  return this.courseForm.get('authors');
}

get duration() {
  return this.courseForm.get('duration');
}

onSubmit() {
  this.submitted = true; 

  if (this.courseForm.invalid) {
    return;
  }

  console.log('Form submitted successfully', this.courseForm.value);
}
}
