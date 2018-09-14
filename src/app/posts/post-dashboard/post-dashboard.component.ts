import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage'
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'post-dashboard',
  templateUrl: './post-dashboard.component.html',  
  styleUrls: ['./post-dashboard.component.scss']
})
export class PostDashboardComponent implements OnInit {

  title: string
  content: string
  published: Date
  instagram: string
  twitter: String
  facebook: string
  image: string = null
  category: string
  verified: boolean = false 
  email: string
  tranding: string

  buttonText: string = "Create Post";
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  selected: string;

  constructor(private auth: AuthService, private postService: PostService, 
        private storage: AngularFireStorage, public snackBar: MatSnackBar,
        private router: Router) { }

  ngOnInit() {
  }

  createPost(){
    console.log(this.selected);
    const data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content : this.content,
      image: this.image,
      published: new Date(),
      title: this.title,
      instagram: this.instagram,
      twitter: this.twitter,
      facebook: this.facebook,
      category: this.selected,
      verified: this.verified,
      email: this.auth.authState.email,
      trending: 0
    };
    this.postService.create(data)
    this.title=''
    this.content=''
    this.instagram=''
    this.facebook=''
    this.instagram=''
    this.twitter=''
    this.image=''
    this.category=''
    this.buttonText = "Post Created!"
    //setTimeout(() => this.buttonText = "Create Post", 3000);
    this.snackBar.open("Post submitted successfully!!!", 'close', {
      duration: 5000
    });  
    this.router.navigate(["/blog"]);   
  }

  uploadImage(event){
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    if(file.type.split('/')[0] !== 'image'){
      return alert('only image files')
    } else {
      const task = this.storage.upload(path, file)
      this.downloadUrl = task.downloadURL()
      this.uploadPercent = task.percentageChanges()
      this.downloadUrl.subscribe(url => this.image = url)
    }
  }
}
