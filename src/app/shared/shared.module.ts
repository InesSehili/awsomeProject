import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import { CommentsComponent } from './components/comments/comments.component';
import {MaterialModule} from "./material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {NamePipe} from "./pipes/name.pipe";
import {TimeAgoPipe} from "./pipes/time-ago.pipe";
import {HighlightDirective} from "./directives/highlight.directive";



@NgModule({
  declarations: [
    CommentsComponent,
    ShortenPipe,
    NamePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    CommentsComponent,
    ReactiveFormsModule,
    ShortenPipe,
    NamePipe,
    TimeAgoPipe,
    HighlightDirective
  ]
})
export class SharedModule { }
