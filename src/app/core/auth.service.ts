import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/switchmap';
import {MatSnackBar} from '@angular/material';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;
  authState: any = null;
 
  constructor(public afAuth: AngularFireAuth,
              private afs: AngularFirestore, 
              private router: Router, 
              public snackBar: MatSnackBar) {
                this.user = this.afAuth.authState.switchMap( user => {
                  if(user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                    return Observable.of(null)
                  }
                })
    this.afAuth.authState.subscribe(data=> this.authState = data)
   }
 
  get authenticated(): boolean {
    return this.authState !== null
  } 

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }
  
  login(){
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider)
  }

  logout() {
    this.afAuth.auth.signOut()
    .then(() => this.snackBar.open("Sign out successful !", 'close', {
      duration: 5000
    }))
    this.router.navigate(['/'])
  }

  emailSignIn(email: string, password: string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() =>
      this.router.navigate(['/'])
    )
    .then(() => this.snackBar.open("Sign in successful !", 'close', {
      duration: 5000
    }))
    .catch(error => this.snackBar.open(error.message, 'close', {
      duration: 5000
    }))
  }

  emailSignUp(displayName: string, email: string, password: string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => this.updateUserData(user))
    .then(() =>
      this.router.navigate(['/'])
    )
    .then(user => {
      this.afAuth.auth.currentUser.sendEmailVerification()
      .then(()=>
      this.snackBar.open("We sent you the email for verification", 'close', {
        duration: 5000
      }))
      .catch(error=>
      this.snackBar.open(error.message, 'close', {
        duration: 5000
      }))
    })
    .catch(error=>
    this.snackBar.open(error.message, 'close', {
      duration: 5000
    }))
    
  }

  resetPassword(email: string){
    return firebase.auth().sendPasswordResetEmail(email)
    .then(() =>
      this.router.navigate(['/'])
    )
    .then(() => this.snackBar.open("Reset password email link is sent", 'close', {
      duration: 5000
    }))
    .catch(error =>this.snackBar.open(error.message, 'close', {
      duration: 5000
    }))
  }

  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    return userRef.set(data, {merge: true})
  }
}