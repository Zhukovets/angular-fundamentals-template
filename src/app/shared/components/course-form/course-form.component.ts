import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {IAuthor} from "@app/interfaces/courses/author-item.interface";
import {shouldShowError} from "@shared/helpers/should-show-error.helper";

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseFormComponent implements OnInit {
    @Input() title?: string;
    @Input() description?: string;
    @Input() duration?: number;
    @Input() authors?: IAuthor[];

    @Input() allAuthors!: IAuthor[];

    @Output() createAuthor = new EventEmitter();
    @Output() authorDelete = new EventEmitter();
    @Output() createCourse = new EventEmitter();
    @Output() cancelButtonEvent = new EventEmitter();

    courseForm!: FormGroup;
    submitted: boolean = false;

    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
    constructor(public fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
        this.courseForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', [Validators.required, Validators.minLength(2)]],
            authors: this.fb.array<IAuthor | undefined>(
                [],
            ),
            duration: ['', [Validators.required, Validators.min(0)]],
            newAuthor: this.fb.group({
                authorName: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]]
            })
        });
    }

    ngOnInit() {
        this.courseForm.patchValue({
            title: this.title,
            description: this.description,
            duration: this.duration || '',
        });
        (this.authors || []).forEach((author: IAuthor) => {
            this.authorsFormArray.push(this.fb.control(author))
        })
    }

    createNewAuthor() {
        const authorNameControl = this.courseForm.get('newAuthor.authorName');
        if (authorNameControl?.valid) {
            const newAuthor = authorNameControl?.value;
            this.createAuthor.emit(newAuthor);
            authorNameControl?.reset()
        }
    }

    //Todo remove from this component
    getAuthorNameErrorMassage(): string {
        const authorNameControl = this.courseForm.get('newAuthor.authorName');
        if (authorNameControl?.hasError('pattern')) {
            return 'New author should contain only latin letters and numbers.';
        }
        if (authorNameControl?.hasError('minlength')) {
            const requiredLength = authorNameControl.getError('minlength')?.requiredLength;
            return `Minimum ${requiredLength} characters required.`;
        }

        return '';
    }

    //Todo remove from this component
    getErrorMessage(controlName: string): string | null {
        const control = this.courseForm.get(controlName);

        if (control && control.errors) {
            if (control.errors['required']) {
                return 'This field is required.';
            }

            if (control.errors['minlength']) {
                const requiredLength = control.errors['minlength'].requiredLength;
                return `Minimum ${requiredLength} characters required.`;
            }
            if (control.errors['min']) {
                const min = control.errors['min'].min;
                return `Should be not less than ${min}.`;
            }
        }
        return null;
    }

    get durationFromControl(): number {
        return this.courseForm.get('duration')?.value
    }

    get authorsFormArray(): FormArray {
        return (this.courseForm.get('authors')! as FormArray);
    }

    get listAuthors(): IAuthor[] {
        return this.authorsFormArray.controls.map(control => control.value);
    }

    addAuthorToCourse(id: string, name: string): void {
        this.authorsFormArray.push(new FormControl({
                id,
                name
            }
        ));
    }

    deleteAuthor(id: string): void {
        this.authorDelete.emit(id);
    }

    deleteAuthorFromCourse(index: number): void {
        this.authorsFormArray.removeAt(index);
    }

    hasCourseAuthors(): boolean {
        return !!this.authorsFormArray.controls.length
    }

    onSubmit() {
        this.submitted = true;

        if (!this.courseForm.valid) return;

        const courseValue = this.courseForm.value;
        delete courseValue.newAuthor;
        courseValue.authors = courseValue.authors.map((author: any) => author.id);

        this.createCourse.emit(courseValue);
    }

    protected readonly shouldShowError = shouldShowError;
}
