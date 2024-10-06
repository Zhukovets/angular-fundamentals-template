import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from './shared/mocks/mock';
import { UserStoreService } from './user/services/user-store.service';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(
    private userStoreService: UserStoreService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {

    this.authService.isAuthorized$.subscribe((isAuthorized) => {
      this.isLoggedIn = isAuthorized;
    });

    this.userStoreService.name$.subscribe((name) => {
      this.userName = name;
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
