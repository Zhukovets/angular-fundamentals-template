import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '@shared/shared.module';
import {AppComponent} from '@app/app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "@app/app-routing.module";
import {CoreModule} from "@app/core/core-module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthModule} from "@auth/auth.module";
import {TokenInterceptor} from "@auth/interceptors/token.interceptor";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {effects, reducers} from "@app/store";
import {HttpErrorInterceptor} from "@auth/interceptors/http-error.interceptor";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        SharedModule,
        FontAwesomeModule,
        RouterOutlet,
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        AuthModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
