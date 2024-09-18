import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      newAuthor: this.fb.group({
        author: [
          '',
          [
            Validators.minLength(2),
            Validators.pattern('^[a-zA-Z0-9 ]*$')
          ]
        ]
      })
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get duration() {
    return this.courseForm.get('duration') as FormControl;
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get newAuthor() {
    return this.courseForm.get('newAuthor') as FormGroup;
  }

  get authorFormControl() {
    return this.newAuthor.get('author') as FormControl;
  }

  createAuthor() {
    if (this.authorFormControl.valid) {
      const name = this.authorFormControl.value.trim();
      const newAuthor = { id: Date.now(), name: name };
      this.authors.push(this.fb.control(newAuthor));
      this.newAuthor.reset();
    }
  }

  addAuthorToCourse(index: number) {
    const author = this.authors.at(index).value;
    this.authors.removeAt(index);
    this.courseAuthors.push(this.fb.control(author));
  }

  removeAuthorFromCourse(index: number) {
    const author = this.courseAuthors.at(index).value;
    this.courseAuthors.removeAt(index);
    this.authors.push(this.fb.control(author));
  }
}