import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from "@app/auth/interceptors/token.interceptor";
import {AuthorizedGuard} from "@app/auth/guards/authorized.guard";
import {NotAuthorizedGuard} from "@app/auth/guards/not-authorized.guard";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SessionStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthorizedGuard,
    NotAuthorizedGuard,
  ]
})

export class AuthModule { }
