import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //creationDate for testing the components
  creationDate = new Date();
  title = 'courses-app';
}
