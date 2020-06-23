import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

// Import containers
//import { DefaultLayoutComponent } from './containers';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSpinnerModule } from 'ngx-spinner';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalcrearordenComponent } from './views/ordenescargas/modalcrearorden/modalcrearorden.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { PruebaComponent } from './views/prueba/prueba.component';
import { ModalsolicitudrecolectaComponent } from './views/solicitudrecolecta/modalsolicitudrecolecta/modalsolicitudrecolecta.component';
import { PdfrelaciondespachoComponent } from './views/ordenescargas/pdfrelaciondespacho/pdfrelaciondespacho.component';
/*import { SolicitudrecolectaComponent } from './views/solicitudrecolecta/solicitudrecolecta.component';
import { DestinatariosComponent } from './views/destinatarios/destinatarios.component';
import { OrdenescargasComponent } from './views/ordenescargas/ordenescargas.component';
import { TrackingComponent } from './views/tracking/tracking.component';
import { EstadocuentaComponent } from './views/estadocuenta/estadocuenta.component';
import { ProfileComponent } from './views/profile/profile.component';*/

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CommonModule,
    HttpClientModule, 
    AngularSvgIconModule.forRoot(),
    NgbModule,
    TooltipModule.forRoot(),
    NgxSpinnerModule
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    ModalcrearordenComponent,
    PruebaComponent,
    ModalsolicitudrecolectaComponent,
    PdfrelaciondespachoComponent,
    /*SolicitudrecolectaComponent,
    DestinatariosComponent,
    OrdenescargasComponent,
    TrackingComponent,
    EstadocuentaComponent,
    //ProfileComponent*/
  ],
  entryComponents: [
    ModalcrearordenComponent,
    ModalsolicitudrecolectaComponent,
    PdfrelaciondespachoComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  DefaultLayoutComponent,
  PruebaComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
