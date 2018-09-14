import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class CoreModule { }
