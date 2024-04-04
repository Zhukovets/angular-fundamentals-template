import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private userStore: UserStoreService) {}

  ngOnInit(): void {
    this.userStore.getUser();
  }
}