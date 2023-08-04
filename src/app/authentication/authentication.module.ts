import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationRoutingModule } from './authentication-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationRoutingModule,
  ],
  exports: [AuthComponent],
})
export class AuthenticationModule {}
