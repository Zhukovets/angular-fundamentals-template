import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.


  authors: Author[] = [];

  ngOnInit(): void {
    this.courseForm = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      description: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      duration: new FormControl('', {
        validators: [Validators.required, Validators.min(0)],
      }),
      author: new FormGroup({
        name: new FormControl('', {
          validators: [
            Validators.pattern(/^[a-zA-Z0-9]+$/),
            Validators.minLength(2),
          ],
        }),
      }),
      authors: new FormArray([]),
    });
  }

  get title() {
    return this.courseForm.get('title');
  }
  get description() {
    return this.courseForm.get('description');
  }
  get duration() {
    return this.courseForm.get('duration');
  }
  get author() {
    return this.courseForm.get('author.name');
  }

  get authorsList() {
    return this.courseForm.get('authors');
  }

  addAuthorToList() {
    this.courseForm.get('author');
    if (this.courseForm.get('author')?.valid) {
      const newAuthor = {
        id: Math.floor(Math.random() * 100),
        name: this.courseForm.get('author.name')?.value,
      };
      this.authors.push(newAuthor);
      this.courseForm.get('author')?.reset();
    }
    console.log(this.authors);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log('form submitted');
      this.courseForm.reset();
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

}
