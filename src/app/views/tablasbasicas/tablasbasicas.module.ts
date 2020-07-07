import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { TablasbasicasComponent } from './tablasbasicas.component';
import { TablasbasicasRoutingModule } from './tablasbasicas-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from '../../containers/default-layout/default-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  imports: [
    FormsModule,
    TablasbasicasRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    HttpClientModule, 
    AngularSvgIconModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
  DefaultLayoutComponent
],
  declarations: [ TablasbasicasComponent ]
})
export class TablasbasicasModule { }