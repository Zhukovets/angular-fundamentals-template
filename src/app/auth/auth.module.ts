import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule, 
    AuthRoutingModule
  ],
  providers: [
    //SessionStorageService,
    //AuthService,
  ]
})
export class AuthModule { }
