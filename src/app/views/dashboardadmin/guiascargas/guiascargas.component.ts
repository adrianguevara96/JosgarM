import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import swal from 'sweetalert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfguiascargasComponent } from './pdfguiascargas/pdfguiascargas.component';
import { ModalguiascargasComponent } from './modalguiascargas/modalguiascargas.component';

@Component({
  selector: 'app-guiascargas',
  templateUrl: './guiascargas.component.html',
  styleUrls: ['./guiascargas.component.css']
})
export class GuiascargasComponent implements OnInit {

  data:any;
  facturas:any[] = []

  //Para la tabla
  guiascarga:any[]=[];
  //lo que envio al modal
  rutas:any;
  ciudades:any;


  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {}

  ngOnInit(){
    this.getCiudades();
    this.getRutas();
    this.getGuiasCarga();
  }

  //Para crear una nueva guia de carga
  newGuiadeCarga(accion:any){
    const modalRef = this.modalService.open(ModalguiascargasComponent, {size: 'xl'});
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.rutas = this.rutas;
    modalRef.componentInstance.ciudades = this.ciudades;

    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa.length > 0){
          this.getGuiasCarga();
        }
      }
    }, (reason)=> {
    })
  }

  openModal(accion:any, gc:any) {
    this.getFacturasxNroGuiaCarga(gc.nro);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      const modalRef = this.modalService.open(ModalguiascargasComponent, {size: 'xl'});
      modalRef.componentInstance.facturas = this.facturas;
      modalRef.componentInstance.guia = gc;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.rutas = this.rutas;
      modalRef.componentInstance.ciudades = this.ciudades;

    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa.length > 0){
          this.getGuiasCarga();
        }
      }
    }, (reason)=> {
    })
    }, 5000);


  }

  getFacturasxNroGuiaCarga(nroguiacarga:any){
    this.service.get(`facturas/nroguiacarga/${nroguiacarga}`).then((result) => {
      let dato:any = result;
      this.facturas = dato;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getGuiasCarga(){
    this.service.get(`guiascarga`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existen guias de cargas creadas en la BD."){
        swal("No existen guias de carga", "No hay guias de cargas registradas en la BD.", "info");
      }else if(this.data.length>0){
        this.guiascarga = [];
        this.guiascarga = this.data;
      }
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

  getRutas(){
    this.service.get('rutas').then((result) => {
      this.rutas = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  cancelGuiaCarga(nro:any){
    this.service.put(null,'factura/cancelnroguiacarga', nro).then((result) => {
      this.data = result;
      if(this.data.message == "El nroguiacarga de la factura ha sido eliminado logicamente."){
        this.service.delete('guiacarga', nro).then((result) =>{
          this.data = result;
          if(this.data.message == `La guia de carga ha sido eliminada fisicamente.`){
            swal("Guia de Carga Eliminada", `Se ha eliminado la guia de carga #${nro} satisfactoriamente`, "success");
            this.getGuiasCarga();
          }
        }, (err) => {
          swal("Error del Sistema", "Ha ocurrido un error al cancelar su relacion de despacho. Por favor, intentelo de nuevo.", "warning");
        })
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al cancelar las facturas de su relacion de despacho. Por favor, intentelo de nuevo.", "warning");
    })
  }

  cancelarGuiaCarga(nro:any){
    swal("¿Está seguro de eliminar esta guía de carga?", {
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        rechazar: "Cancelar",
        aceptar: true
      },
    } as any)
    .then((value) => {
      switch (value) {
        case "aceptar":
          this.cancelGuiaCarga(nro)
          this.getGuiasCarga();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }



}
