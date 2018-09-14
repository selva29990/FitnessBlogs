import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../auth.style.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string;

  constructor(private auth: AuthService, 
              private router: Router) { }

  ngOnInit() {
  }

  resetPassword(){
    this.auth.resetPassword(this.email)
    .then(() => this.router.navigate(['/signin']))
  }
}
