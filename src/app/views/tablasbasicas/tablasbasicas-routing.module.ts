import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablasbasicasComponent } from './tablasbasicas.component';

const routes: Routes = [
  {
    path: '',
    component: TablasbasicasComponent,
    data: {
      title: 'Tablas Basicas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablasbasicasRoutingModule {}