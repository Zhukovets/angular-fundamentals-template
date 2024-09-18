import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  //Created courses for viewing purposes
  courses = [
    {
    title: 'Javascript',
    description: 'Lorem Ipsum dolor sit amet',
    id: '012345',
    creationDate: new Date(2024, 0, 1),
    duration: 230,
    authors: ['Anna Sidorenko', 'Valentina Larina']
  },
  {
    title: 'Angular',
    description: 'Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit ametLorem Ipsum dolor sit ametLorem Ipsum dolor sit amet',
    id: '67890',
    creationDate: new Date(2024, 5, 6),
    duration: 105,
    authors: ['Dave Simmonds', 'Tony Robbins']
  }
];

}
