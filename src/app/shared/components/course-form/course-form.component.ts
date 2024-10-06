import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {

  courseForm!: FormGroup;
  availableAuthors: {id: string, name: string}[]= [];
  authorIdCounter = 1;
  courseId: string | null = null;
  buttonText: string = 'Create Course'

  constructor(public fb: FormBuilder, public library: FaIconLibrary, private route: ActivatedRoute, private router: Router, private coursesService: CoursesService, private coursesFacade: CoursesStateFacade) {
    library.addIconPacks(fas);

    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      author: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.coursesService.getAllAuthors().subscribe(
      (authors) => {
          this.availableAuthors = authors.result;
      },
      (error) => {
          console.error('Error loading authors:', error);
      }
    );

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id');

      if (this.courseId) {
        this.loadCourseData(this.courseId)
        this.buttonText = 'Edit Course'
      }
    });
  }

  private loadCourseData(courseId: string) {
    this.coursesFacade.course$.subscribe(course => {
      if (course) {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration
        });

        this.authors.clear();

        this.coursesService.getAllAuthors().subscribe(allAuthors => {
          this.availableAuthors = allAuthors.result;
          course.authors.forEach((authorId: string) => {
            const author = allAuthors.result.find((a: any) => a.id === authorId);
            if (author) {
              this.addAuthorToCourse(author);
            }
          });
        });
      }
    })

    this.coursesFacade.getSingleCourse(courseId)
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
    const authorName = this.courseForm.get('author')?.value; 
    if (authorName) {

      this.coursesService.createAuthor(authorName).subscribe(
        (response: any) => {
          const newAuthor = { id: response.id, name: authorName };
          this.availableAuthors.push(newAuthor);
          this.courseForm.get('author')?.reset();
        },
        (error: any) => {
          console.error('Error creating author:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
        const formData = { ...this.courseForm.value };
        if (formData.authors && Array.isArray(formData.authors)) {
            formData.authors = formData.authors.map((author: any) => author.id); 
                    
        if (this.courseId) {
          this.coursesFacade.editCourse(this.courseId, formData);

          this.coursesFacade.courses$.subscribe(courses => {
            const updatedCourse = courses.find(course => course.id === this.courseId);
            if (updatedCourse) {
              this.router.navigate(['/courses']);
            }
          });
        } else {
          this.coursesFacade.createCourse(formData);

          this.coursesFacade.courses$.subscribe(courses => {
            if (courses.length > 0) {
              this.router.navigate(['/courses']);
            }
          });
        }
    } else {
        this.courseForm.markAllAsTouched();
    }
    }
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
