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
    this.getRelacionesDespacho();
  }

  //Para crear una nueva relacion de despacho
  newRelacionDespacho(accion:any){
    const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;

    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      console.log("Que me trae result al cerrar modal crear? ", result)
      if(result){
        let dataa:any[] = result
        console.log("Que me trae data? :", dataa);
        if(dataa.length > 0){
          //Solicitar relaciones de despacho al API
          this.getRelacionesDespacho();
        }
      }
    }, (reason)=> {
      console.log("Reason? :", reason)
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
      }, 5000);
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      console.log("Error al hacer get a estados ", err)
    });
  };

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      console.log("Error al hacer get a ciudades ", err)
    });
  };

  getFacturasxNroRelacionDespacho(nrorelaciondespacho:any){
    this.service.get(`facturas/${nrorelaciondespacho}`).then((result) => {
      let dato:any = result;
      this.facturas = dato;
    }, 
    (err) => {
      console.log("Error al hacer get a ciudades ", err)
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
      console.log("Error al hacer get a ciudades ", err)
    });
  };

  buscarFacturasdeRelacionDespacho(accion:any){
    if(this.buscarNroRelacionDespacho == ""){
      swal("Rellenar Campo", "Por favor, rellene el campo nro. de relacion de despacho.", "info");
    }else{
      this.service.get(`relaciondespacho/user/${this.user.id}/nro/${this.buscarNroRelacionDespacho}`).then((result) => {
        let daattaa:any = result;
        this.facturas = daattaa;
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
          const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
          modalRef.componentInstance.relacionDespacho = this.facturas;
          modalRef.componentInstance.accion = accion;
          modalRef.componentInstance.estados = this.estados;
          modalRef.componentInstance.ciudades = this.ciudades;
        }, 5000);
      }, (err) => {
        console.log("Error al buscar esa relacion de despacho. ", err)
      })
    }
  }



}
