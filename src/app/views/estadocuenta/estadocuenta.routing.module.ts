import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadocuentaComponent } from './estadocuenta.component';

const routes: Routes = [
  {
    path: '',
    component: EstadocuentaComponent,
    data: {
      title: 'EstadodeCuenta'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadocuentaRoutingModule {}