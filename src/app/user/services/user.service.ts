import { Injectable } from '@angular/core';
import { CoursesBackendService } from '@app/services/coursesbackend.service';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private courseBackend: CoursesBackendService){}

    getUser() {
        // Add your code here
        return this.courseBackend.get('/users/me').pipe(
            map((response: any) => {
                if (response.successful) {
                    return response.result;
                }
                return null;
            })
        );
    }
}