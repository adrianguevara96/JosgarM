import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { TrackingComponent } from './tracking.component';
import { TrackingRoutingModule } from './tracking-routing.module';

import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';



@NgModule({
  imports: [
    FormsModule,
    TrackingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    CommonModule,
    TooltipModule.forRoot(),
    AngularSvgIconModule.forRoot(),
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    NgbModule
    
  ],
  declarations: [ TrackingComponent ],
  providers: [DecimalPipe]
})
export class TrackingModule { }