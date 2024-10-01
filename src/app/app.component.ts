import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';
import { UserService } from './user/services/user.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //these are for testing
  creationDate = new Date();
  mockedCoursesList = mockedCoursesList;

  
  title = 'courses-app';
  user: User = {
    name: "",
    email: "",
    password: ""
  };

  constructor(private userService: UserService){
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data', err);
      }
    });
  }
}
