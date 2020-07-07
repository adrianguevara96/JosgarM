import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardadminComponent } from './dashboardadmin.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardadminComponent,
    data: {
      title: 'Dashboard Administrativo'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardadminRoutingModule {}