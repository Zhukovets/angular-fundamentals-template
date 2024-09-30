import { Component } from '@angular/core';
import { ButtonText } from 'src/app/models/const'
import {AuthService} from '@app/auth/services/auth.service';
import {UserStoreService} from "@app/user/services/user-store.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'courses-app';
  buttonTexts = ButtonText;

  constructor(protected auth: AuthService, protected userStoreService: UserStoreService) { }
}

