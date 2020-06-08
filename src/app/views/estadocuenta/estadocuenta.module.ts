import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { EstadocuentaComponent } from './estadocuenta.component';
import { EstadocuentaRoutingModule } from './estadocuenta.routing.module';

@NgModule({
  imports: [
    FormsModule,
    EstadocuentaRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ EstadocuentaComponent ]
})
export class EstadocuentaModule { }