// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { RegisterComponent } from './register.component';

@NgModule({
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      BrowserModule
    ],
    declarations: [
        RegisterComponent
    ]
  })
  export class RegisterModule { }