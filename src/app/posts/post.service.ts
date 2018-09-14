import { Post } from './post';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Router } from '@angular/router';

@Injectable()
export class PostService {

  postCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore, private router: Router) {
    this.postCollection = this.afs.collection(
    'posts', ref =>
    ref.orderBy('published', 'desc'))
   }

   getPosts(){
     return this.postCollection.snapshotChanges().map(actions=>{
       return actions.map(a =>{
         const data = a.payload.doc.data() as Post
         const id = a.payload.doc.id
         return { id, ...data}
       })
     })
   }

   getFilterPosts(filter){
    this.postCollection = this.afs.collection('posts', ref => {
     return ref.where('category', '==', filter)
    });
    console.log(this.postCollection.valueChanges());
    return this.postCollection.valueChanges();
   }

   getAllPosts(){
    this.postCollection = this.afs.collection(
      'posts', ref =>
      ref.orderBy('published', 'desc'))

    //this.postCollection = this.afs.collection('posts', ref => {
    // return ref;
    //});
    //console.log(this.postCollection.valueChanges());
    return this.postCollection.valueChanges();
   }

   getPostData(id: string){
    this.postDoc = this.afs.doc<Post>(`posts/${id}`)
    return  this.postDoc.valueChanges()
   }

   create(data: Post){
      this.postCollection.add(data)
   }

   getPost(id: string){
     return this.afs.doc<Post>(`posts/${id}`)
   }

   delete(id: string){
    this.getPost(id).delete()
   }

   update(id: string, formData){
    return this.getPost(id).update(formData)
    .then(() =>
    this.router.navigate(['/'])
    )
   }
}

