import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialMediaRoutingModule } from './social-media-routing.module';
import {PostService} from "./services/post.service";
import {PostsResolver} from "./resolvers/posts.resolver";
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    PostListComponent,
    PostListItemComponent
  ],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    MatCardModule,
    SharedModule
  ],
  providers: [
    PostService,
    PostsResolver
  ]
})
export class SocialMediaModule {

}
