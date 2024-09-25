import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

interface Author {
  id: number;
  name: string;
}

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
    return this.courseForm.get('newAuthor.name');
  }

  get authorsList() {
    return this.courseForm.get('authors');
  }

  addAuthorToList() {
    if (this.author?.valid) {
      const newAuthor = {
        id: Math.floor(Math.random() * 100),
        name: this.author?.value,
      };
      this.authors.push(newAuthor);
      this.author?.reset();
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

// get titleIsInvalid() {
//   return this.title?.touched;
// }

// ngOnInit(): void {  this.heroForm = new FormGroup({    name: new FormControl(this.hero.name, [      Validators.required,      Validators.minLength(4),      forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.    ]),    alterEgo: new FormControl(this.hero.alterEgo),    power: new FormControl(this.hero.power, Validators.required)  });}get name() { return this.heroForm.get('name'); }get power() { return this.heroForm.get('power'); }

// latin letters&numbers check=> /^[a-zA-Z0-9]/
