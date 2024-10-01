import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';
import { UserService } from './user/services/user.service';
import { User } from './models/user.model';
import { UserStoreService } from './user/services/user-store.service';
import { AuthService } from './auth/services/auth.service';
import { SessionStorageService } from './auth/services/session-storage.service';
import { CoursesService } from './services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  //these are for testing
  creationDate = new Date();
  mockedCoursesList = mockedCoursesList;


  title = 'courses-app';
  isLoggedIn = false;
  userName = "";
  user: User = {
    name: "",
    email: "",
    password: ""
  };

  constructor(
    private userService: UserService,
    private userStoreService: UserStoreService,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private coursesService: CoursesService
  ){}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userStoreService.getUser();

    this.authService.isAuthorized$.subscribe((isAuthorized) => {
      this.isLoggedIn = isAuthorized;
    })

    if(this.sessionStorageService.getToken()){
      this.isLoggedIn = true;
      this.userStoreService.name$.subscribe((name) => {
        this.user.name = name;
      })
    }

    /*this.coursesService.courses$.subscribe(courses => {
      if (courses) {
        this.infoTitle = "" // If there are courses, set flag to true
      } 
    });*/
  }

  logout(){
    this.authService.logout();
  }
}
