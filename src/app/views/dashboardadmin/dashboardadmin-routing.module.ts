import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardadminComponent } from './dashboardadmin.component';
import { UsersComponent } from './users/users.component';
import { RelacionesdespachosComponent } from './relacionesdespachos/relacionesdespachos.component';
import { SolicitudesrecolectasComponent } from './solicitudesrecolectas/solicitudesrecolectas.component';
import { GuiascargasComponent } from './guiascargas/guiascargas.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Panel Administrativo'
    },
    children: [
      {
        path: '',
        redirectTo: 'inicio'
      },
      {
        path: 'inicio',
        component: DashboardadminComponent,
        data: {
          title: 'Inicio'
        }
      },
      {
        path: 'usuarios',
        component: UsersComponent,
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'relacionesdespachos',
        component: RelacionesdespachosComponent,
        data: {
          title: 'Relaciones de Despacho'
        }
      },
      {
        path: 'solicitudesrecolectas',
        component: SolicitudesrecolectasComponent,
        data: {
          title: 'Solicitudes de Recolecta'
        }
      },
      {
        path: 'guiascarga',
        component: GuiascargasComponent,
        data: {
          title: 'Guías de Carga'
        }
      },
      {
        path: 'tracking',
        component: TrackingComponent,
        data: {
          title: 'Tracking'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardadminRoutingModule {}