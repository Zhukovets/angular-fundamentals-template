import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "@auth/services/auth.service";
import {UserStoreService} from "@app/user/services/user-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'courses-app';

  private userService = inject(UserStoreService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.checkAuthorization();
    if (!this.authService.isAuthorised) return;
    this.userService.getUser().subscribe();
  }

}
