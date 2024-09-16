import { Component } from '@angular/core';
import { ButtonText } from 'src/app/models/const'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'courses-app';
  buttonTexts = ButtonText;
}

