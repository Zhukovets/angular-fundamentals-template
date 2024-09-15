import { Component } from '@angular/core';
import { Course } from './features/course-info/course-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'courses-app';

  courseList: Course[] = [
    // Populate with example courses
    {
      title: 'Angular',
      id: '323928392',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque ab eum numquam, magni velit rem repellendus aspernatur porro quibusdam placeat dolore modi. Quia fugiat quam qui aliquid modi voluptatem. Odio!',
      creationDate: new Date('2024-08-20'),
      duration: 120,
      authors: ['Luther Arto, Sharper Sneaky'],
    },
    {
      title: 'React',
      id: '22293939',
      description:
        ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis placeat, eum, officia, sequi blanditiis nesciunt exercitationem maxime autem molestias ipsa natus tempora corporis odio optio est quidem obcaecati harum! A.2',
      creationDate: new Date('2024-09-16'),
      duration: 80,
      authors: ['Artos Murr, Arthur Cooper'],
    },
  ];

  course: Course = {
    title: 'Introduction to Angular',
    description: 'A comprehensive guide to Angular framework.',
    id: '12345',
    creationDate: new Date('2023-09-01'), // Convert string to Date object
    duration: 120,
    authors: ['Jane Doe', 'John Smith'],
  };
}
