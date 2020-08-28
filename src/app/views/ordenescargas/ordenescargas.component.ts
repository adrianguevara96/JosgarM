import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalcrearordenComponent } from './modalcrearorden/modalcrearorden.component';
import { PruebaComponent } from '../prueba/prueba.component';
import { ServicesService } from '../../services/services.service';
import swal from 'sweetalert';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-ordenescargas',
  templateUrl: './ordenescargas.component.html',
  styleUrls: ['./ordenescargas.component.css']
})
export class OrdenescargasComponent{

  buscarNroRelacionDespacho = "";
  
  user:any; //Datos del Usuario
  data:any; //Cualquier tipo de dato que reciba de alguna solicitud de los servicios

  //lo que envio al modal
  estados:any;
  ciudades:any;
  tiposidentificacion:any;

  facturas:any[] = []
  facturastosee:any;
  facturassearched:any;
  //Para la tabla
  relacionesDespacho:any[]=[];
  relacionDespacho10:any[]=[];

  constructor(
    private modalService: NgbModal,
    public pru: PruebaComponent,
    public service: ServicesService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(){
    this.user = this.service.getUser();
    this.getEstados();
    this.getCiudades();
    this.getTiposIdentificacion();
    this.getRelacionesDespacho();
  }

  //Para crear una nueva relacion de despacho
  newRelacionDespacho(accion:any){
    const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;
    modalRef.componentInstance.tiposidentificacion = this.tiposidentificacion;

    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa.length > 0){
          //Solicitar relaciones de despacho al API
          this.getRelacionesDespacho();
        }
      }
    }, (reason)=> {
    })
  }

  //Para la paginacion
  pageChanged(event: PageChangedEvent){
    //Event page: Pagina actual  ItemsPerPage: Datos por pagina.
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.relacionDespacho10 = this.relacionesDespacho.slice(startItem, endItem);
  }

  openModal(accion:any, nro:any) {
      this.getFacturasxNroRelacionDespacho(nro);
      this.spinner.show();
      setTimeout(() => {
        this.spinner.hide();
        const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
        modalRef.componentInstance.relacionDespacho = this.facturas;
        modalRef.componentInstance.accion = accion;
        modalRef.componentInstance.estados = this.estados;
        modalRef.componentInstance.ciudades = this.ciudades;
        modalRef.componentInstance.tiposidentificacion = this.tiposidentificacion;

      }, 5000);
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getTiposIdentificacion(){
    this.service.get('tiposidentificacion').then((result) => {
      this.tiposidentificacion = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getFacturasxNroRelacionDespacho(nrorelaciondespacho:any){
    this.service.get(`facturas/${nrorelaciondespacho}`).then((result) => {
      let dato:any = result;
      this.facturas = dato;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getRelacionesDespacho(){
    this.service.get(`relaciondespacho/user/${this.user.id}`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existe el usuario relacionado a relaciones de despacho en la BD."){
        swal("No existen relaciones de despacho", "Ud no posee relaciones de despacho. Le invitamos a crear una y a disfrutar de nuestro servicios.", "info");
      }else if(this.data.length>0){
        this.relacionesDespacho = this.data;
        this.relacionDespacho10 = this.relacionesDespacho.slice(0, 10);
      }
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  buscarFacturasdeRelacionDespacho(accion:any){
    if(this.buscarNroRelacionDespacho == ""){
      swal("Rellenar Campo", "Por favor, rellene el campo nro. de relacion de despacho.", "info");
    }else{
      this.service.get(`relaciondespacho/user/${this.user.id}/nro/${this.buscarNroRelacionDespacho}`).then((result) => {
        let daattaa:any = result;
        if(daattaa.message == "No existe la relacion de despacho asociada al usuario en la BD."){
          swal("No existe la relacion de despacho", "El nro de relacion de despacho que esta buscando no existe, por favor ingrese otro numero de relacion de despacho.", "info");
          this.buscarNroRelacionDespacho = "";
        }else{
          this.facturas = daattaa;
          this.spinner.show();
          this.buscarNroRelacionDespacho = "";
          setTimeout(() => {
            this.spinner.hide();
            const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
            modalRef.componentInstance.relacionDespacho = this.facturas;
            modalRef.componentInstance.accion = accion;
            modalRef.componentInstance.estados = this.estados;
            modalRef.componentInstance.ciudades = this.ciudades;
            modalRef.componentInstance.tiposidentificacion = this.tiposidentificacion;
          }, 5000);
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }
  }



}
