import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Author } from "@app/models/author.model";
import { CoursesService } from "@app/services/courses.service";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  authors: string[] = [];
  @Input() duration: number | string = 0;
  @Input() set setCreationDate(value: string) {
    this.creationDate = new Date(value).toLocaleString();
  }
  ngOnInit() {}

  constructor(private coursesService: CoursesService) {
    this.getAuthorsByIds("40b21bd5-cbae-4f33-b154-0252b1ae03a9");
  }

  author: string = "";

  @Input() isEditable: boolean = false;
  @Input() creationDate: string = "";
  @Output() clickOnShow = new EventEmitter<void>();

  onShowCourse(): void {
    this.clickOnShow.emit();
  }

  getAuthorsByIds(id: string) {
    this.coursesService.getAuthorById(id).subscribe({
      next: (author: Author) => {
        this.author = author.name;
      },
      error: (err) => {
        console.error("Error fetching author", err);
      },
    });
  }
}
