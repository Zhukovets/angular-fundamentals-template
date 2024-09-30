import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '@shared/shared.module';
import {UserModule} from '@app/user/user.module';
import {AppComponent} from '@app/app.component';
import {CourseInfoComponent} from '@features/course-info/course-info.component';
import {NotAuthorizedGuard} from '@app/auth/guards/not-authorized.guard';
import {AuthorizedGuard} from '@app/auth/guards/authorized.guard';
import {CoursesStoreService} from '@app/services/courses-store.service';
import {CoursesService} from '@app/services/courses.service';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from '@app/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '@app/auth/services/auth.service';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {TokenInterceptor} from "@app/auth/interceptors/token.interceptor";


@NgModule({
    declarations: [AppComponent, CourseInfoComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        RouterOutlet,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        UserModule
    ],
    providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService, AuthService, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
