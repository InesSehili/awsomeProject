import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HedearComponent } from './components/hedear/hedear.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    HedearComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  exports: [
    HedearComponent
  ]
})
export class CoreModule { }
