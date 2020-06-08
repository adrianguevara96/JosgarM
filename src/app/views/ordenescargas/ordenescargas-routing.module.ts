import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenescargasComponent } from './ordenescargas.component';

const routes: Routes = [
  {
    path: '',
    component: OrdenescargasComponent,
    data: {
      title: 'Ordenes de Carga'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenescargasRoutingModule {}