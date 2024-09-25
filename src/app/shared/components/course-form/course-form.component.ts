import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent {
  courseForm!: FormGroup;
  formFields = {
    title: 'title',
    description: 'description',
    duration: 'duration',
    author: 'author',
    authorName: 'name',
    nameInAuthor: 'author.name'
  }

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.buildForm();
  }

  buildForm(): void {
    this.courseForm = this.fb.group({
      [this.formFields.title]: ['', [Validators.required, Validators.minLength(2)]],
      [this.formFields.description]: ['', [Validators.required, Validators.minLength(2)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
      [this.formFields.author]: this.fb.group({
        [this.formFields.authorName]: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      }),
      [this.formFields.duration]: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get titleControl(): FormControl{
    return this.courseForm.get(this.formFields.title)! as FormControl;
  }

  get descriptionControl(): FormControl{
    return this.courseForm.get(this.formFields.description)! as FormControl;
  }

  get durationControl(): FormControl{
    return this.courseForm.get(this.formFields.duration)! as FormControl;
  }

  get authorNameControl(): FormControl{
    return this.courseForm.get(this.formFields.nameInAuthor)! as FormControl;
  }

  addAuthor(): void {
    const nestedGroup = this.courseForm.get('author') as FormGroup;
    const newAuthorControl = this.courseForm.get('author')?.get('name');
    const authorName = newAuthorControl?.value;
    const authorId = uuidv4();

    if (authorName && nestedGroup?.valid) {
      this.authors.push(this.fb.group({
        id: [authorId],
        name: [authorName]
      }));
      newAuthorControl?.setValue('');
    }
    nestedGroup.markAllAsTouched();
  }

  addAuthorToCourseAuthor(index: number): void {
    this.courseAuthors.push(this.authors.at(index));
    this.authors.removeAt(index);
  }

  removeAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  removeCourseAuthor(index: number): void {
    this.authors.push(this.courseAuthors.at(index));
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
