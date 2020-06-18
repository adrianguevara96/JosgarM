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

  //Para la tabla
  solicitudesRecolecta:any[] = [
    {
      nro: '1',
      bultos:'20',
      fecha: '05/02/20',
      hora: '09:50:10',
      status: 'Pendiente'
    },
    {
      nro: '3',
      bultos:'61',
      fecha: '07/03/20',
      hora: '13:20:20',
      status: 'Cancelado'
    },
    {
      nro: '8',
      bultos:'20',
      fecha: '15/03/20',
      hora: '15:03:25',
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
/*
  openModal(accion:any, id:any) {
    //console.log("Entrando en OpenModal", accion, id)
    if(accion == "edit"){ //Para editar una relacion de despacho
      this.facturastoedit = [];
      for(let j =0; j<this.facturas.length; j++){
        if(this.facturas[j].nrorelaciondespacho == id){
          this.facturastoedit.push(this.facturas[j]);
        }
      }
      const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
      modalRef.componentInstance.relacionDespacho = this.facturastoedit;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.tipoU = this.tipoU;
      //Solicitar al API la relacion despacho por el ID
    }else if(accion == "see"){ //Para ver una relacion de despacho
      this.facturastosee = [];
      for(let j =0; j<this.facturas.length; j++){
        if(this.facturas[j].nrorelaciondespacho == id){
          this.facturastosee.push(this.facturas[j]);
        }
      }
      //console.log("Que le envia facturastosee al modal?: ", this.facturastosee)
      const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
      modalRef.componentInstance.relacionDespacho = this.facturastosee;
      modalRef.componentInstance.accion = accion;
      modalRef.componentInstance.tipoU = this.tipoU;
      //Solicitar al API la relacion despacho por el ID
    }
  }

*/
}
