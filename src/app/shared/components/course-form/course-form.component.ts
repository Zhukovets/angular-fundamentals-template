import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  authorsList = ['Author 1', 'Author 2', 'Author 3'];
  courseAuthors = new FormArray<FormControl<string | null>>([]);

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(1)]],
      newAuthor: this.fb.group({
        name: ['', [Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(2)]],
      }),
      authors: this.courseAuthors
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

  get newAuthorName() {
    return this.courseForm.get('newAuthor.name');
  }

  addAuthor() {
    if (this.newAuthorName?.valid) {
      this.authorsList.push(this.newAuthorName?.value);
      this.newAuthorName?.reset();
    }
  }
  addAuthorToCourse(author: string, index: number) {
    this.courseAuthors.push(new FormControl<string | null>(author));
    this.authorsList.splice(index, 1);
  }
  removeAuthorFromCourse(index: number) {
    const removedAuthor = this.courseAuthors.at(index).value;
    this.authorsList.push(removedAuthor || "");
    this.courseAuthors.removeAt(index);
  }

  submitted = false;
  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
