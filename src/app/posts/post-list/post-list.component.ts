import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../post';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { MatTabChangeEvent } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Observable<Post[]>

  constructor(private postsService: PostService, public auth: AuthService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
      iconRegistry.addSvgIcon(
        'thumbs-up',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/thumbup-icon.png'));
     }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    console.log(this);
  }

  delete(id: string){
    console.log("****id****" ,id);
    this.postsService.delete(id);
  }

  onLinkClick(event: MatTabChangeEvent) {
    console.log('event => ', event);
    console.log('index => ', event.index);
    console.log('tab => ', event.tab); 
    if(event.index == 0){
     this.posts = this.postsService.getPosts();
    } 
    if(event.index == 1){
     this.posts = this.postsService.getFilterPosts("Health");
    } 
    if(event.index == 2){
     this.posts = this.postsService.getFilterPosts("Fitness");
    } 
    if(event.index == 3){
     this.posts = this.postsService.getFilterPosts("Wellness");
    } 
  }
}
