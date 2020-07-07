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
  allDestinatarios:any[];
  direccionesentrega: any[];

  inputBuscar = "";

  //Para enviarlas al modal
  estados:any;
  ciudades:any;
  ciudadesxEstado:any[] =[];

  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService,
    ) { }

  ngOnInit(){
    this.user = this.service.getUser();
    this.getDestinatarios();
  }


  openModal(accion:any, dest:any) { 
    console.log("destinatario de openModal", dest);
    this.getDireccionesEntxDestinatario(dest[0].idd);
    console.log("dest.idd ", dest[0].idd)
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'xl'});
      modalRef.componentInstance.direccionesEntrega = this.direccionesentrega;
      modalRef.componentInstance.destinatario = dest;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.estados = this.estados;
      modalRef.componentInstance.ciudades = this.ciudades;
    }, 5000);
  }
  openModalCrear(){
    setTimeout(()=>{
      const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'xl'});
      modalRef.componentInstance.estados = this.estados;
      modalRef.componentInstance.ciudades = this.ciudades;
    }, 3000);
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
        swal("No existen destinatario. Ud no posee destinatarios, le invitamos a crear uno para disfrutar de nuestros servicios.","info");
      }else if(this.data.length>0){
        this.allDestinatarios = this.data;
        this.destinatarios = this.allDestinatarios.slice(0,10);
      }
    },
    (err) => {
      console.log("Error en el get de destinatarios", err)
    }
  );
  }
//Obtiene las direcciones de entrega del destinatario
getDireccionesEntxDestinatario(iddestinarario:any){
  this.service.get(`direccionesentrega/${iddestinarario}`).then((result) => {
    let dato:any = result;
    this.direccionesentrega = dato;
    console.log("getDireccionesEntrega ", this.direccionesentrega);
  }, (err) => {
    console.log("Error en la busqueda de direcciones de entrega ", err)
  });
}

buscarDestinatarios(accion:any){
  if(this.inputBuscar==""){
    swal("Rellenar Campo", "Por favor, rellene el campo con el rif del destinatario.","info");
  }else{
    this.service.get(`destinatario/${this.inputBuscar}/user/${this.user.id}`).then((result) => {
      let data:any = result;
      if(data.message == "No existe el destinatario en la BD."){
        swal("No existe el destinatario", "El rif del destinatario que esta buscando no existe. por favor ingrese otro rif.","info");
        this.inputBuscar = "";
      }else{
        this.destinatario = data;
        console.log("Destinatarios trae en data ",this.destinatario);
        this.spinner.show();
        this.inputBuscar = "";
        this.openModal(accion,this.destinatario);
      }
    }, (err) => {
      console.log("Error en la busqueda de destinatario ");
    })
  }
}

//Obtener estados y ciudades para enviarlos al modal
getEstados(){
  this.service.get('estados').then((result) => {
    this.estados = result;
  }, (err) => {
    console.log("Error en el get de estados ", err);
  });
}

getCiudades(){
  this.service.get('ciudades').then((result) => {
    this.ciudades = result;
  }, (err) => {
    console.log("Error en el get de ciudades ", err);
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
