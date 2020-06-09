import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
//import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ProfileRoutingModule,
    ChartsModule,
    //BrowserAnimationsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    //BrowserModule,
    CommonModule
  ],
  declarations: [ ProfileComponent ]
})
export class ProfileModule { }