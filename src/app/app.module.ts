import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {SocialMediaModule} from "./social-media/social-media.module";
import {ComplexFormComponent} from "./complex-form/components/complex-form/complex-form.component";
import {ComplexFormModule} from "./complex-form/complex-form.module";
import {ReactiveStateModule} from "./reactive-state/reactive-state.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SocialMediaModule,
    ComplexFormModule,
    ReactiveStateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
