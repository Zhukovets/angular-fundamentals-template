import { Component } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { UserService } from '@app/user/services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  isLoggedIn = false;
  userName: string | null = null;

  constructor ( private authService: AuthService, private userService: UserService, private router: Router ) {
    this.authService.isAuthorized$.subscribe((isAuthorised$) => {
      this.isLoggedIn = isAuthorised$;

      if (this.isLoggedIn) {
        this.fetchUserName();
      } else {
        this.userName = null;
      }
    });
  }

  fetchUserName(): void {
    this.userService.getUser().pipe(
      tap((response: any) => {

        if(response && response.result.name === null){
          this.userName = 'Admin'
        } else {
        this.userName = response.result.name;
        }
      })
    ).subscribe({
      error: (err) => {
        console.error('Failed to fetch user details:', err);
        this.userName = null;
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onLogin(): void {
    this.router.navigate(['/login']);
    console.log(this.userService.getUser())    
  }
}
