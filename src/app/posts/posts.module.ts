import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostService } from './post.service';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';

const routes: Routes = [ 
  { path: 'blog', component: PostListComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'dashboard', component: PostDashboardComponent }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent, PostComponent],
  providers: [PostService]
})
export class PostsModule { }
