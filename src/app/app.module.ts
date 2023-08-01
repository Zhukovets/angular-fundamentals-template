import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MockDataService } from '@app/mock-data.service';
import { AppLoader } from '@app/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent, AppLoader
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
  ],
  providers: [MockDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
