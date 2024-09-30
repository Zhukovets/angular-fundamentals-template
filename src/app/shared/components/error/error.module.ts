import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorRoutingModule } from './error-routing.module';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
