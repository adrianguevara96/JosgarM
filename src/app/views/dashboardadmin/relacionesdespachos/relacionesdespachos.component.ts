import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import swal from 'sweetalert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalcrearordenComponent } from '../../ordenescargas/modalcrearorden/modalcrearorden.component';

@Component({
  selector: 'app-relacionesdespachos',
  templateUrl: './relacionesdespachos.component.html',
  styleUrls: ['./relacionesdespachos.component.css']
})
export class RelacionesdespachosComponent implements OnInit {

  ciudades:any;
  estados:any;
  relacionesdespacho:any[]=[];
  data:any;
  buscarNroRelacionDespacho = "";
  facturas:any[] = []

  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getEstados();
    this.getCiudades();
    this.getRelacionesDespacho();
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
      console.log("Error al hacer get a en facturasxNroRelacionDespacho ", err)
    });
  };

  getRelacionesDespacho(){
    this.service.get(`users/relacionesdespacho`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existen relaciones de despachos en la BD."){
        swal("No existen usuarios con relaciones de despacho creadas", "info");
      }else if(this.data.length>0){
        this.relacionesdespacho = [];
        this.relacionesdespacho = this.data;
      }
    }, 
    (err) => {
      console.log("Error al hacer get a ciudades ", err)
    });
  };

  cancelRelacionDespacho(nro:any){
    this.service.put(null,'factura/cancel', nro).then((result) => {
      this.data = result;
      if(this.data.message == "La factura ha sido eliminada logicamente."){
        this.service.put(null,'relaciondespacho/cancel', nro).then((result) =>{
          this.data = result;
          if(this.data.message == `La relacion de despacho #${nro} ha sido eliminada logicamente.`){
            swal("Relacion de Despacho Cancelada", `Se ha cancelado la relacion de recolecta #${nro} satisfactoriamente`, "success");
            this.getRelacionesDespacho();
          }
        }, (err) => {
          swal("Error del Sistema", "Ha ocurrido un error al cancelar su relacion de despacho. Por favor, intentelo de nuevo.", "warning");
        })
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al cancelar las facturas de su relacion de despacho. Por favor, intentelo de nuevo.", "warning");
    })
  }

  cancelarRelacionDespacho(nro:any){
    console.log("??? ", nro);
    swal("¿Está seguro de cancelar esta solicitud de recolecta?", {
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
          console.log("Cancelando ...")
          this.cancelRelacionDespacho(nro)
          this.getRelacionesDespacho();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  /*buscarFacturasdeRelacionDespacho(accion:any){
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
          }, 5000);
        }
      }, (err) => {
        console.log("Error al buscar esa relacion de despacho. ", err)
      })
    }
  }*/

}
