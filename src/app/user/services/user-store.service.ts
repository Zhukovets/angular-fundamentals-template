import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  getUser() {
    // Add your code here
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get isAdmin() {
    // Add your code here. Get isAdmin$$ value
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
  }
}
