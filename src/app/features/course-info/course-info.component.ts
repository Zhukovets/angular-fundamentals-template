import {Component, Input, OnInit} from '@angular/core';
import {Author, CardItem} from 'src/app/models/card.model';
import {ButtonText} from 'src/app/models/const';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesStoreService} from "@app/services/courses-store.service";

@Component({
    selector: 'app-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent implements OnInit {
    buttonText = ButtonText;
    @Input() courseInfo: CardItem = {} as CardItem;

    constructor(private router: Router, private route: ActivatedRoute, private coursesStoreService: CoursesStoreService) {
    }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.coursesStoreService.getCourseWithAuthors(id).subscribe({
                next: (resp)=>{
                    this.courseInfo = {
                        ...resp.course,
                        authors: resp.courseAuthors.map((item:Author)=>item.name)
                    }
                }
            })
        }
    }
}
