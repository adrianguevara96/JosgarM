import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudrecolectaComponent } from './solicitudrecolecta.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudrecolectaComponent,
    data: {
      title: 'Solicitud de Recolecta'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudrecolectaRoutingModule {}