import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { DestinatariosComponent } from './destinatarios.component';
import { DestinatariosRoutingModule } from './destinatarios-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    FormsModule,
    DestinatariosRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    CommonModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [ DestinatariosComponent ]
})
export class DestinatariosModule { }