import {Component, Input, OnInit} from '@angular/core';
import {
    FormBuilder, FormControl, FormGroup, Validators, FormArray
} from '@angular/forms';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ButtonIcon, ButtonText} from "@app/models/const";
import {Author} from "@app/models/card.model";
import {mockedAuthorsList} from "@shared/mocks/mocks";
import {v4 as uuidv4} from 'uuid';

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    constructor(public fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
    }

    @Input() authorsList: Author[] = mockedAuthorsList; //temporary
    courseForm!: FormGroup;
    buttonTexts = ButtonText;
    buttonIcon = ButtonIcon;
    minLength: number = 2;
    disabled: boolean = false;
    courseAuthors: Author[] = [];

    inputNames: Map<string, boolean> = new Map([
        ["title", false],
        ["description", false],
        ["duration", false],
        ["author", false],
    ]);
    durationValue: number = 0;

    get inputTitle() {
        return this.inputNames.get('title');
    }

    get inputDescription() {
        return this.inputNames.get('description');
    }

    get inputDuration() {
        return this.inputNames.get('duration');
    }

    get inputAuthor() {
        return this.inputNames.get('author');
    }

    getFormsControls(): FormArray {
        return this.courseForm.controls['authors'] as FormArray;
    }

    getFormsControlsCourse(): FormArray {
        return this.courseForm.controls['courseAuthors'] as FormArray;
    }

    addCourseAuthor(item: Author) {
        if (item.id !== undefined) this.courseAuthors = [...this.courseAuthors, item];
        let index = this.deleteAuthor(this.authorsList, item.id);
        const authors = this.getFormsControls();
        authors.removeAt(index);
        const courseAuthors = this.getFormsControlsCourse();
        this.inserCourseAuthor(courseAuthors, item);
    }

    addAuthor(data: string) {
        let temp: Author = {
            id: uuidv4(),
            name: this.courseForm.controls['author']?.value.trim()
        }
        const authors = this.getFormsControls();
        this.inserCourseAuthor(authors, temp);
        this.courseForm.controls['author']?.patchValue('')
    }

    inserCourseAuthor(param: FormArray, item: Author) {
        param.push(
            new FormGroup({
                id: new FormControl(item.id),
                name: new FormControl(item.name)
            })
        );
    }

    deleteCourseAuthor(item: Author) {
        let index = this.deleteAuthor(this.courseAuthors, item.id);
        const authors = this.getFormsControlsCourse();
        authors.removeAt(index);
        const authorsNew = this.getFormsControls();
        this.inserCourseAuthor(authorsNew, item)
    }

    deleteAuthor(arr: Author[], id: string): number {
        const index = arr.findIndex(item => item.id === id);
        if (index !== -1) arr.splice(index, 1);
        return index;
    }

    fillAuthorList(arr: Author[]): FormGroup[] {
        return arr.map((author) => {
            return new FormGroup({
                id: new FormControl(author.id),
                name: new FormControl({value: author.name, disabled: this.disabled}),
            });
        });
    }

    public ngOnInit(): void {

        this.courseForm = this.fb.group({
            "title": ["", [Validators.required,
                Validators.minLength(this.minLength)]],
            "description": ["", [Validators.required,
                Validators.minLength(this.minLength)]],
            "duration": ["", [Validators.required, Validators.min(0)]],
            "author": ["", [Validators.pattern('^[a-zA-Z0-9 ]*$')]],
            "authors": this.fb.array(this.fillAuthorList(this.authorsList)),
            "courseAuthors": this.fb.array(this.fillAuthorList(this.courseAuthors)),
        });

        //Subscribtions
        this.inputNames.forEach((val, key) => {
            this.courseForm.controls[key]?.valueChanges.subscribe(value => {
                this.inputNames.set(key, true);

                if (key === "duration") {
                    this.durationValue = value;
                }
            });
        })
    }

    // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
