import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalagregardestinatarioComponent } from './modalagregardestinatario/modalagregardestinatario.component';
import { ServicesService } from '../../services/services.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert';

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent implements OnInit {

  user:any;
  data: any;

  destinatario:any[];
  destinatarios:any[] = [];
  allDestinatarios:any[]=[];
  direccionesentrega: any[]=[];

  inputBuscar = "";

  //Para enviarlas al modal
  estados:any;
  ciudades:any;
  ciudadesxEstado:any[] =[];
  id:any; //Tipo de identificacion (V,J,G, etc)

  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(){
    this.user = this.service.getUser();
    this.getDestinatarios();
    this.getEstados();
    this.getCiudades();
    this.getTiposIdentificacion();
  }


  openModal(accion:any, dest:any) { 
    this.getDireccionesEntxDestinatario(dest.idd);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'xl'});
      modalRef.componentInstance.direccionesEntrega = this.direccionesentrega;
      modalRef.componentInstance.destinatario = dest;
      modalRef.componentInstance.nombreDest = dest.nombre;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.estados = this.estados;
      modalRef.componentInstance.ciudades = this.ciudades;
      modalRef.componentInstance.identificacion = this.id;

      modalRef.result.then((result) => {
        if(result){
          let dataa:any[] = result
          if(dataa){
            //Solicitar relaciones de despacho al API
            this.getDestinatarios();
          }
        }
      }, (reason)=> {
      })
    }, 5000);
  }
  openModalCrear(){
    const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'xl'});
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;
    modalRef.componentInstance.identificacion = this.id;

    modalRef.result.then((result) => {
      if(result){
        let dataa:any = result
        if(dataa.iduser){
          this.getDestinatarios();
        }
      }
    }, (reason)=> {
    })
  }
  OpenModalBuscar(accion:any,dest:any){
    this.getDireccionesEntxDestinatario(dest.idd);
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'xl'});
      modalRef.componentInstance.direccionesEntrega = this.direccionesentrega;
      modalRef.componentInstance.destinatario = dest;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.estados = this.estados;
      modalRef.componentInstance.ciudades = this.ciudades;
      modalRef.componentInstance.identificacion = this.id;
    }, 5000);
  }

  seeModal(){
    const modalRef = this.modalService.open(ModalagregardestinatarioComponent);
    modalRef.componentInstance.relacionDespacho = this.destinatario;
  }



 //Obtiene todos los destinatarios del usuario para la vista principal
  getDestinatarios(){
    this.service.get(`destinatarios/${this.user.id}`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existen destinatarios asociados al usuario en la BD."){
        this.destinatarios = [];
        swal("No existen destinatario.", "Ud no posee destinatarios, le invitamos a crear uno para disfrutar de nuestros servicios.","info");
      }else if(this.data.length>0){
        this.allDestinatarios = this.data;
        this.destinatarios = this.allDestinatarios.slice(0,10);
      }
    },
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    }
  );
  }
//Obtiene las direcciones de entrega del destinatario
getDireccionesEntxDestinatario(iddestinarario:any){
  this.service.get(`direccionesentrega/${iddestinarario}`).then((result) => {
    let dato:any = result;
    this.direccionesentrega = dato;
  }, (err) => {
    swal("Error del Sistema", "Error en la busqueda de direcciones de entrega.","warning");
  });
}

buscarDestinatarios(accion:any){
  if(this.inputBuscar==""){
    swal("Rellenar Campo", "Por favor, rellene el campo con el rif del destinatario.","info");
  }else{
    this.service.get(`destinatario/${this.inputBuscar}/user/${this.user.id}`).then((result) => {
      let data:any = result;
      if(data.message == "No existe el destinatario en la BD."){
        this.service.get(`destinatario/${this.inputBuscar}`).then((result) => {
          let data:any = result;
          if(data.message == "No existe el destinatario asociado al usuario en la BD."){
            swal("No existe el destinatario", "El rif del destinatario que esta buscando no existe. por favor ingrese otro rif.","info");
            this.inputBuscar = "";
          }else{
            this.destinatario = data[0];
            //this.spinner.show();
            this.inputBuscar = "";
            this.OpenModalBuscar(accion, this.destinatario);
          }
        })
      }else{
        this.destinatario = data[0];
        //this.spinner.show();
        this.inputBuscar = "";
        this.OpenModalBuscar(accion,this.destinatario);
      }
    }, (err) => {
      swal("Error del Sistema", "Error en la busqueda de destinatario.","warning");
    })
  }
}


//ELIMINAR DESTINATARIO
cancelarDestinatario(dest:any){
  swal("¿Está seguro de eliminar este destinatario?", {
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
        this.eliminarDestinatarios(dest);
        //this.getDestinatarios();
        break;
      case "rechazar":
      swal.close();
      break;
    }
  });
}

eliminarDestinatarios(dest:any){
  this.service.delete('destinatario', dest.idd).then((result) =>{
    let data:any = result;
    if(data.message == "El destinatario ha sido eliminado fisicamente."){
      this.getDestinatarios();
      swal("Destinatario Eliminado","El destinatario ha sido eliminado satisfactoriamente. ","success");
    }
  })
}

//Obtener estados y ciudades para enviarlos al modal
getEstados(){
  this.service.get('estados').then((result) => {
    this.estados = result;
  }, (err) => {
    swal("Error del Sistema", "Error al obtener los estados.","warning");
  });
}

getCiudades(){
  this.service.get('ciudades').then((result) => {
    this.ciudades = result;
  }, (err) => {
    swal("Error del Sistema", "Error al obtener las ciudades.","warning");
  });
}

getTiposIdentificacion(){
  this.service.get('tiposidentificacion').then((result) => {
    this.id = result;
  }, 
  (err) => {
    swal("Error del Sistema", "Error al obtener los tipos de identificacion.","warning");
  });
}
 //Para la paginacion
 pageChanged(event: PageChangedEvent){
  //Event page: Pagina actual  ItemsPerPage: Datos por pagina.
  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.destinatarios = this.allDestinatarios.slice(startItem, endItem);
}

} //Llave principal
