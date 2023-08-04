import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationModule } from '../authentication/authentication.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule, RouterModule, AuthenticationModule],
  exports: [NavbarComponent, HomeComponent],
})
export class SharedModule {}
