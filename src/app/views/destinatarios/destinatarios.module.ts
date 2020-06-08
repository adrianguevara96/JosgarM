import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DestinatariosComponent } from './destinatarios.component';
import { DestinatariosRoutingModule } from './destinatarios-routing.module';

@NgModule({
  imports: [
    FormsModule,
    DestinatariosRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ DestinatariosComponent ]
})
export class DestinatariosModule { }