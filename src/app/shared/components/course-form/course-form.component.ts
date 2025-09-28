import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { mockedAuthorsList } from '../../mocks/mocks';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  submitted = false;
  formErrors: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: ['', [Validators.required, Validators.min(0)]],
      author: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
      authors: this.fb.array([]),
      courseAuthors: this.fb.array([]),
    });

  }

  ngOnInit(): void {
    mockedAuthorsList.forEach(a => {
      this.authors.push(this.fb.group({ id: [a.id], name: [a.name] }));
    });
  }

  get title() { return this.courseForm.get('title') as FormControl; }
  get description() { return this.courseForm.get('description') as FormControl; }
  get duration() { return this.courseForm.get('duration') as FormControl; }
  get author() { return this.courseForm.get('author') as FormControl; }
  get authors() { return this.courseForm.get('authors') as FormArray; }
  get courseAuthors() { return this.courseForm.get('courseAuthors') as FormArray; }

  addAuthor(index: number) {
    const authorGroup = this.authors.at(index);
    if (authorGroup) {
      const author = { ...authorGroup.value };
      this.courseAuthors.push(this.fb.group(author));
      this.authors.removeAt(index);
    }
  }

  removeAuthor(index: number) {
    const authorGroup = this.courseAuthors.at(index);
    if (authorGroup) {
      const author = { ...authorGroup.value };
      this.authors.push(this.fb.group(author));
      this.courseAuthors.removeAt(index);
    }
  }

  isValidAuthorName(name: string): boolean {
    return /^[a-zA-Z0-9\s]+$/.test(name);
  }

  createAuthor() {
    const authorControl = this.author;
    if (!authorControl.value || authorControl.invalid) {
      authorControl.markAsTouched();
      this.formErrors['author'] = 'Author name is invalid';
      return;
    }
    const created = { id: Date.now().toString(), name: authorControl.value };
    this.authors.push(this.fb.group(created));
    authorControl.reset();
    this.formErrors['author'] = '';
  }

  validateForm() {
    this.formErrors = {};
    Object.keys(this.courseForm.controls).forEach(key => {
      const control = this.courseForm.get(key);
      if (control && control.invalid && (control.dirty || control.touched || this.submitted)) {
        if (control.errors?.['required']) {
          this.formErrors[key] = `${key} is required`;
        } else if (control.errors?.['minlength']) {
          const minLength = control.errors['minlength'];
          this.formErrors[key] = `${key} must be at least ${minLength.requiredLength} characters`;
        } else if (control.errors?.['pattern']) {
          if (key === 'author') {
            this.formErrors[key] = 'Author name should contain only latin letters and numbers';
          } else {
            this.formErrors[key] = `${key} contains invalid characters`;
          }
        }
      }
    });
  }



  formatDuration(v: any): string {
    const n = Number(v) || 0;
    const h = Math.floor(n / 60);
    const m = n % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }

  onSubmit() {
    this.submitted = true;
    this.validateForm();
    
    if (!this.courseForm.valid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.title.value,
      description: this.description.value,
      duration: Number(this.duration.value) || 0,
      authors: this.courseAuthors.value.map((x: any) => x.id),
    };
    console.log(payload);
  }
}