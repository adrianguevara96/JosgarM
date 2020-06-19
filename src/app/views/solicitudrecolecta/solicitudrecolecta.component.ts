import { Component, OnInit } from '@angular/core';
import { PruebaComponent } from '../prueba/prueba.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { ModalsolicitudrecolectaComponent } from './modalsolicitudrecolecta/modalsolicitudrecolecta.component';

@Component({
  selector: 'app-solicitudrecolecta',
  templateUrl: './solicitudrecolecta.component.html',
  styleUrls: ['./solicitudrecolecta.component.css']
})
export class SolicitudrecolectaComponent implements OnInit {

  tipoU:number;
  solicitudtosee:any[]=[];
  //Para la tabla
  solicitudesRecolecta:any[] = [
    {
      nro: '1',
      bultos:'20',
      tipomercancia: 'Respuestos',
      fecha: '05/02/20',
      hora: '09:50:10',
      estado: 'Lara',
      ciudad: 'Barquisimeto',
      direccion: '123 por alla',
      observacion: '1234567890',
      status: 'Pendiente'
    },
    {
      nro: '3',
      bultos:'61',
      tipomercancia: '',
      fecha: '07/03/20',
      hora: '13:20:20',
      estado: '',
      ciudad: '',
      direccion: '',
      observacion: '',
      status: 'Cancelado'
    },
    {
      nro: '8',
      bultos:'20',
      tipomercancia: '',
      fecha: '15/03/20',
      hora: '15:03:25',
      estado: '',
      ciudad: '',
      direccion: '',
      observacion: '',
      status: 'Aceptado'
    },
  ]
  constructor(
    private modalService: NgbModal,
    public pru: PruebaComponent) {
      this.tipoU = this.pru.gettipoU();
  }

  ngOnInit(): void {
  }

  cancelarSolicitud(i:any){
    console.log("Posicion: ?", i)
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
          this.solicitudesRecolecta[i].status = 'Cancelado'
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  
  //Para crear una nueva relacion de despacho
  newSolicitudRecolecta(){
    const modalRef = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
    console.log("Modal result?: ", modalRef.result);
    modalRef.result.then((result) => {
      console.log("Que me trae result al cerrar modal crear? ", result)
      if(result){
        let data:any[] = result
        console.log("Que me trae data? :", data);
        if(data.length > 0 ){
          this.solicitudesRecolecta.push({
            nro: data[0].nro,
            bultos: data[0].bultos,
            fecha: data[0].fecha,
            hora: data[0].hora,
            status: data[0].estatus
          })
        }
        //aqui se llama a la api para que traiga todas las relaciones de despacho del usuario
        /*this.relacionesDespacho.push(
          {
            id: 16,
            fecha: data[0].fecha,
            status: 'Pendiente'
          }
        )*/
      }
    }, (reason)=> {
      console.log("Reason? :", reason)
    })
  }

  openModal(accion:any,nro:any) {
    //console.log("Entrando en OpenModal", accion, id)
    this.solicitudtosee = []; //Para ver una solicitud de despacho
    for(let j =0; j<this.solicitudesRecolecta.length; j++){
      if(this.solicitudesRecolecta[j].nro == nro){
        this.solicitudtosee.push(this.solicitudesRecolecta[j]);
      }
    }
    //console.log("Que le envia facturastosee al modal?: ", this.facturastosee)
    const modalRef1 = this.modalService.open(ModalsolicitudrecolectaComponent, {size: 'xl'});
    modalRef1.componentInstance.solicitudReco = this.solicitudtosee;
    modalRef1.componentInstance.accion = accion;
    //Solicitar al API la relacion despacho por el ID
  }

}
