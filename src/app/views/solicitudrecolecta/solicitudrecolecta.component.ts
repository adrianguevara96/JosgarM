import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ModalsolicitudrecolectaComponent } from './modalsolicitudrecolecta/modalsolicitudrecolecta.component';
import { ServicesService } from '../../services/services.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-solicitudrecolecta',
  templateUrl: './solicitudrecolecta.component.html',
  styleUrls: ['./solicitudrecolecta.component.css']
})
export class SolicitudrecolectaComponent implements OnInit {

  user:any;
  data: any;
  estados:any;
  ciudades:any;
  tiposmercancia:any;
  status:any[] = [
    {
      id: 0,
      nombre: 'Cancelado'
    },
    {
      id: 1,
      nombre: 'Pendiente'
    },
    {
      id: 2,
      nombre: 'Aceptado'
    }
  ]


  solicitudtosee:any[]=[];
  solicitudsearched:any[]=[];
  //Para la tabla - status: 0 - Cancelado / 1 - Pendiente / 2 - Aceptado
  solicitudesRecolecta:any[] = []
  solicitudesRecolecta10:any[]=[];
  buscarNroSolicitudRecolecta="";


  constructor(
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService) {
      this.user = this.service.getUser();
  }

  ngOnInit(){
    this.getEstados();
    this.getCiudades();
    this.getTiposMercancia();
    this.getSolicitudesRecolecta();
  }

  cancelarSolicitud(solicitudrecolecta:any){
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
          this.cancelSolicitudRecolecta(solicitudrecolecta)
          this.getSolicitudesRecolecta();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  
  //Para crear una nueva solicitud de recolecta
  newSolicitudRecolecta(){
    const modalRef = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;
    modalRef.componentInstance.tiposmercancia = this.tiposmercancia;

    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let data:any = result
        if(data.bultos){
          this.getSolicitudesRecolecta();
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
    this.solicitudesRecolecta10 = this.solicitudesRecolecta.slice(startItem, endItem);
  }

  //Metodo para ver las solicitudes de recolecta
  openModal(accion:any,nro:any) { 
    this.solicitudtosee = []; //Para ver una solicitud de despacho
    for(let j =0; j<this.solicitudesRecolecta.length; j++){
      if(this.solicitudesRecolecta[j].nro == nro){
        this.solicitudtosee.push(this.solicitudesRecolecta[j]);
      }
    }
    const modalRef1 = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
    modalRef1.componentInstance.solicitudReco = this.solicitudtosee;
    modalRef1.componentInstance.accion = accion;
    modalRef1.componentInstance.estados = this.estados;
    modalRef1.componentInstance.ciudades = this.ciudades;
    modalRef1.componentInstance.tiposmercancia = this.tiposmercancia;
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
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

  getTiposMercancia(){
    this.service.get('tiposmercancia').then((result) => {
      this.tiposmercancia = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getSolicitudesRecolecta(){
    this.service.get(`solicitudrecolecta/user/${this.user.id}`).then((result) =>{
      this.data = result;
      if(this.data.message == "No existen solicitudes de recolecta asociadas al usuario en la BD."){
        swal("No existen solicitudes de recolecta", "Ud no posee solicitudes de recolecta. Le invitamos a crear una y a disfrutar de nuestros servicios.", "info");
      }else if(this.data.length>0){
        this.solicitudesRecolecta = this.data;
        this.solicitudesRecolecta10 = this.solicitudesRecolecta.slice(0, 10);
      }
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error al eliminar su solicitud de recolecta. Por favor, intentelo de nuevo. ${err}`, "warning");
    });
  };

  cancelSolicitudRecolecta(solicitudrecolecta:any){
    this.service.delete('solicitudrecolecta',solicitudrecolecta.nro).then((result) =>{
      this.data = result;
      if(this.data.message == `La solicitud de recolecta ha sido eliminada fisicamente.`){
        swal("Solicitud de Recolecta Eliminada", `Se ha eliminado su solicitud de recolecta #${solicitudrecolecta.nro} satisfactoriamente`, "success");
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error al eliminar su solicitud de recolecta. Por favor, intentelo de nuevo. ${err}`, "warning");
    })
  }

  buscarFacturasdeRelacionDespacho(accion:any){
    if(this.buscarNroSolicitudRecolecta == ""){
      swal("Rellenar Campo", "Por favor, rellene el campo nro. de solicitud de recolecta.", "info");
    }else{
      this.service.get(`solicitudrecolecta/user/${this.user.id}/nro/${this.buscarNroSolicitudRecolecta}`).then((result) => {
        let daattaa:any = result;
        if(daattaa.message == "No existe la solicitud de recolecta asociada al usuario en la BD."){
          swal("No existe la solicitud de recolecta", "El nro de la solicitud de recolecta que esta buscando no existe, por favor ingrese otro numero.", "info");
          this.buscarNroSolicitudRecolecta = "";
        }else{
          this.solicitudsearched = daattaa;
          this.buscarNroSolicitudRecolecta = "";
          this.spinner.show();
          setTimeout(() => {
            this.spinner.hide();
            const modalRef = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
            modalRef.componentInstance.solicitudReco = this.solicitudsearched;
            modalRef.componentInstance.accion = accion;
            modalRef.componentInstance.estados = this.estados;
            modalRef.componentInstance.ciudades = this.ciudades;
            modalRef.componentInstance.tiposmercancia = this.tiposmercancia;
          }, 5000);
        }
      }, (err) => {
        swal("Error del Sistema", "Ha ocurrido un error al cancelar su solicitud de recolecta. Por favor, intentelo de nuevo.", "warning");
      })
    }
  }

}
