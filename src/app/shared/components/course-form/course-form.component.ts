import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {

  courseForm!: FormGroup;
  availableAuthors: {id: string, name: string}[]= [];
  authorIdCounter = 1;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        author: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]*$')]]
      })
    });
  }
  
  generateAuthorId(): string {
    return `author-${this.authorIdCounter++}`;
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray
  }

  addAuthorToCourse(author: {id: string, name: string}): void {
    this.authors.push(new FormControl ({ id: author.id, name: author.name }));

    this.availableAuthors = this.availableAuthors.filter(a => a.id !== author.id)
  }

  removeAuthorFromCourse(index: number): void {
    const removedAuthor = this.authors.at(index).value;
    this.availableAuthors.push(removedAuthor);
    this.authors.removeAt(index)
  }

  createAuthor(): void {
    const authorName = this.courseForm.get('newAuthor.author')?.value
    if(authorName) {
      const newAuthor = {id: this.generateAuthorId(), name: authorName};
      this.availableAuthors.push(newAuthor);
      this.courseForm.get('newAuthor')?.reset();
    }
  }

  onSubmit() {
    if(this.courseForm.valid) {
      console.log('Course Form Submitted:', this.courseForm.value);
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
