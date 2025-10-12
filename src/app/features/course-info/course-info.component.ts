import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CoursesStoreService } from '@app/services/courses-store.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  id: string = '';
  isShowBackButton: boolean = true;

  course: {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
  } = {
    id: '',
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: []
  };

  constructor(
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    if (!this.id) return;

    this.coursesStore.getCourse(this.id)
      .pipe(take(1))
      .subscribe({
        next: (res: any) => {
          const src = res?.result ?? res ?? {};

          let authorsArray: string[] = [];
          if (Array.isArray(src.authors)) {
            authorsArray = src.authors.map((a: any) => (a == null ? '' : String(a)));
          } else if (typeof src.authors === 'string') {
            authorsArray = [src.authors];
          } else if (src.authors == null) {
            authorsArray = [];
          } else {
            try {
              authorsArray = (src.authors as any[]).map((a: any) =>
                typeof a === 'string' ? a : (a?.name ? String(a.name) : String(a))
              );
            } catch {
              authorsArray = [];
            }
          }

          this.course = {
            id: src.id ?? this.id,
            title: src.title ?? '',
            description: src.description ?? '',
            creationDate: String(src.creationDate ?? ''),
            duration: src.duration ?? 0,
            authors: authorsArray
          };
        },
        error: () => {
          this.course = { ...this.course, id: this.id };
        }
      });
  }
}
