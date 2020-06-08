// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';

import { LoginComponent } from './login.component';

@NgModule({
    imports: [
      CommonModule,
      ModalModule.forRoot()
    ],
    declarations: [
        LoginComponent
    ]
  })
  export class LoginModule { }