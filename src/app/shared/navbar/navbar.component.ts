import { DialogComponent } from './../dialog/dialog.component';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  events = [];

  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  public openLogoutDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: "Are you sure ?" }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
   }

}

