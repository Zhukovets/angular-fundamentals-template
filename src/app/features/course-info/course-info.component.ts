import {Component, Input, OnInit} from '@angular/core';
import {CardItem} from 'src/app/models/card.model';
import {ButtonText} from 'src/app/models/const';
import {ActivatedRoute} from "@angular/router";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent implements OnInit {
    buttonText = ButtonText;
    @Input() courseInfo: CardItem = {} as CardItem;

    constructor(private route: ActivatedRoute,
                private coursesFacade: CoursesStateFacade) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.coursesFacade.getSingleCourse(id);
            this.coursesFacade.getAllAuthors();
            this.coursesFacade.course$.subscribe({
                next: (response) => {
                    if (response) {
                        this.coursesFacade.authors$.subscribe({
                            next: (authors) => {
                                if (authors) {
                                    let authorsMap = authors.reduce((acc, author) => {
                                        acc[author.id] = author.name;
                                        return acc;
                                    }, {} as { [key: string]: string });

                                    this.courseInfo = {
                                        ...response,
                                        authors: response?.authors?.map((authorId) => authorsMap[authorId] || authorId)
                                    };
                                }
                            },
                            error: (err) => {
                                console.error('Error fetching authors:', err);
                            }
                        })
                    }
                },
                error: (err) => {
                    console.error('Error fetching course:', err);
                }
            })
        }
    }
}
