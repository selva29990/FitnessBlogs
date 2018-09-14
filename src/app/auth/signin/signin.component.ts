import { Observable } from 'rxjs/Observable';
import { SharedModule } from './../../shared/shared.module';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../auth.style.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router, 
    public snackBar: MatSnackBar
  ) { 
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '', [Validators.pattern('^(?=.*[0-9](?=.*[a-zA-Z])(a-zA-Z0-9)+)$'), 
            Validators.minLength(4)
          ]
      ]
    });
  }

  ngOnInit() {
  }

  get email() {
    return this.signInForm.get('email')
  }

  get password(){
    return this.signInForm.get('password')
  }

  signIn(){
    console.log("***", this.email.value)
    return this.auth.emailSignIn(this.email.value, this.password.value)
    .then(user=>{
      if(this.signInForm.valid){

        this.router.navigate(['/blog'])
      }
    })
  }
}
