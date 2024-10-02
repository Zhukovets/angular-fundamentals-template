import {Component, Input, OnInit} from '@angular/core';
import {
    FormBuilder, FormControl, FormGroup, Validators, FormArray, AbstractControl
} from '@angular/forms';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ButtonIcon, ButtonText} from "@app/models/const";
import {Author, CreateCourseRequest} from "@app/models/card.model";
import {v4 as uuidv4} from 'uuid';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesStoreService} from "@app/services/courses-store.service";

@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
    constructor(public fb: FormBuilder, public library: FaIconLibrary,
                private router: Router, private route: ActivatedRoute,
                private coursesStoreService: CoursesStoreService
    ) {
        library.addIconPacks(fas);
        this.initForm()
    }

    @Input() authorsList: Author[] = [];
    courseForm!: FormGroup;
    buttonTexts = ButtonText;
    buttonIcon = ButtonIcon;
    minLength: number = 2;
    disabled: boolean = false;
    durationValue: number = 0;
    courseAuthors: Author[] = [];
    id: string = "";

    inputNames: Map<string, boolean> = new Map([
        ['title', false],
        ['description', false],
        ['duration', false],
        ['author', false],
    ]);


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

    trackByFn(index: number, control: AbstractControl): string {
        return control.value.id ? control.value.id : index;
    }

    addCourseAuthor(item: Author) {
        if (item.id !== undefined) this.courseAuthors = [...this.courseAuthors, item];
        let index = this.deleteAuthor(this.authorsList, item.id);
        const authors = this.getFormsControls();
        authors.removeAt(index);
        const courseAuthors = this.getFormsControlsCourse();
        this.insertCourseAuthor(courseAuthors, item);
    }

    addAuthor() {
        let authorName = this.courseForm.controls['author']?.value.trim();
        const authors = this.getFormsControls();
        this.coursesStoreService.createAuthor(authorName).subscribe({
                next: (resp) => {
                    this.insertCourseAuthor(authors, resp.result);
                    this.courseForm.controls['author']?.patchValue('')
                },
                error: (err) => {
                    console.error('Error adding author:', err);
                }
            }
        )
        this.router.navigate([this.router.url])
    }

    insertCourseAuthor(param: FormArray, item: Author) {
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
        this.insertCourseAuthor(authorsNew, item)
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

    initForm(): void {

        this.courseForm = this.fb.group({
            'title': ['', [Validators.required,
                Validators.minLength(this.minLength)]],
            'description': ['', [Validators.required,
                Validators.minLength(this.minLength)]],
            'duration': ['', [Validators.required, Validators.min(0)]],
            'author': ['', [Validators.pattern('^[a-zA-Z0-9 ]*$'), Validators.minLength(this.minLength)]],
            'authors': this.fb.array(this.fillAuthorList(this.authorsList)),
            'courseAuthors': this.fb.array(this.fillAuthorList(this.courseAuthors)),
        });
    }

    public ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id') || '';

        if (this.id !== '') {
            this.coursesStoreService.getCourseWithAuthors(this.id).subscribe({
                next: (response) => {
                    this.courseForm.get('title')?.setValue(response.course.title)
                    this.courseForm.get('description')?.setValue(response.course.description)
                    this.courseForm.get('duration')?.setValue(response.course.duration)

                    this.courseAuthors = response.courseAuthors
                    this.courseForm.setControl('courseAuthors', this.fb.array(this.fillAuthorList(response.courseAuthors)))

                    this.authorsList = response.authors;
                    this.courseForm.setControl('authors', this.fb.array(this.fillAuthorList(response.authors)));
                }
            })
        } else {
            this.coursesStoreService.getAllAuthors().subscribe({
                    next: (response) => {
                        this.authorsList = response.result;
                        this.courseForm.setControl('authors', this.fb.array(this.fillAuthorList(this.authorsList)));
                    }
                }
            )
        }

        //Subscriptions
        this.inputNames.forEach((val, key) => {
            const control = this.courseForm.controls[key];
            if (control) {
                this.courseForm.controls[key]?.valueChanges.subscribe(value => {
                    this.inputNames.set(key, true);
                    if (key === 'duration') {
                        this.durationValue = value;
                    }
                });
            }
        })
    }

    onSubmitForm(e: any) {
        this.onSubmit();
    }

    onSubmit(): void {
        const course: CreateCourseRequest = {
            title: this.courseForm.value.title,
            description: this.courseForm.value.description,
            duration: this.courseForm.value.duration,
            authors: this.courseForm.value.courseAuthors.map((item: any) => item.id),
        }
        if (this.id !== '') {
            this.coursesStoreService.editCourse(this.id, course);
        } else {
            this.coursesStoreService.createCourse(course);
        }
        this.router.navigate(['/courses'])
    }
}
