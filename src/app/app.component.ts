import { Component } from '@angular/core';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  creationDate: Date = new Date('2012-03-20');
  courses: Course[] = [
    {
      id: '1',
      title: 'Angular',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      creationDate: new Date('2012-03-20'),
      duration: 150,
      authors: ['Dave Haisenberg', 'Tony Ja']
    },
    {
      id: '2',
      title: 'Java',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      creationDate: new Date('2017-08-14'),
      duration: 90,
      authors: ['Dave Simmonds', 'Valentina Lary']
    },
    {
      id: '3',
      title: 'ASP .NET',
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      creationDate: new Date('2022-06-01'),
      duration: 210,
      authors: ['Sam Smith', 'Tony Robbins']
    }
  ];

  selectedCourse: Course | null = null;

  showCourse(courseId: string) {
    this.selectedCourse = this.courses.find(course => course.id === courseId) || null;
  }

  onBackClick() {
    this.selectedCourse = null;
  }
}


