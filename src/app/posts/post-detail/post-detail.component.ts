import { AuthService } from './../../core/auth.service';
import { PostService } from './../post.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  @Input() ippost: Post

  post: Post; 
  editing: boolean = false;

  constructor(private route: ActivatedRoute, 
    private postService: PostService,
    private router: Router,
    public auth: AuthService, 
    public snackBar: MatSnackBar) { }
 
  ngOnInit() {
    this.getPost();
    console.log("Post detail called****");
  }

  getPost(){
    const id = this.route.snapshot.paramMap.get("id")
    return this.postService.getPostData(id).subscribe(
      data => (this.post = data)
    );
  }
  

  updatePost(){
    const formData = {
      title: this.post.title,
      content: this.post.content
    };
    const id = this.route.snapshot.paramMap.get("id")
    this.postService.update(id, formData);
    this.editing = false;
    this.snackBar.open("Post updated successfully!", 'close', {
      duration: 5000
    }); 
   }

  delete(){
    const id = this.route.snapshot.paramMap.get("id")
    this.postService.delete(id); 
    this.snackBar.open("Post deleted successfully!", 'close', {
      duration: 5000
    }); 
    this.router.navigate(["/blog"]);   
  }

  trending(value: number){
    const id = this.route.snapshot.paramMap.get("id")
    if(id) {
      this.postService.update(id, { trending: value+1})
    }
  }
}
