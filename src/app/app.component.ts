import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  showForm: string = '';
  userName: string = 'Harry Potter';

  constructor(private authService: AuthService, public router: Router) { }

  get isLogin(): boolean {
    return this.authService.isAuthorised;
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}