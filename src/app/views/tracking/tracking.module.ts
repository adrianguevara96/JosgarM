import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { TrackingComponent } from './tracking.component';
import { TrackingRoutingModule } from './tracking-routing.module';

@NgModule({
  imports: [
    FormsModule,
    TrackingRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ TrackingComponent ]
})
export class TrackingModule { }