import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalcrearordenComponent } from './modalcrearorden/modalcrearorden.component';
import { DefaultLayoutComponent } from '../../containers';
import { PruebaComponent } from '../prueba/prueba.component';

@Component({
  selector: 'app-ordenescargas',
  templateUrl: './ordenescargas.component.html',
  styleUrls: ['./ordenescargas.component.css']
})
export class OrdenescargasComponent{
  tipoU:number;

  //lo que envio al modal
  /* facturas tendra todas las facturas que pertenecen a las relaciones de despacho
     del usuario. Si tiene 3 relaciones y 3 facturas por cada una, saldrn
     las 9 facturas enumeradas por su nrorelaciondespacho */
  facturas:any[] = [
    {
      nro: '1',
      bultos: 3,
      valor: 7000000,
      RIF: '78459652',
      RazonSocial:'Facturas, Inc.',
      Estado: '',
      Ciudad: '',
      Dir: 'Calle por aqui, esquina por alla',
      fecha: '05/02/20 09:45:10',
      nrorelaciondespacho: 1,
      status: 1
    },
    {
      nro: '2',
      bultos: 2,
      valor: 8500000,
      RIF: '78459602',
      RazonSocial:'Facturas II, Inc.',
      Estado: '',
      Ciudad: '',
      Dir: 'Calle por aqui, esquina por alla',
      fecha: '05/02/20 09:47:40',
      nrorelaciondespacho: 1,
      status: 1
    },
    {
      nro: '3',
      bultos: 7,
      valor: 8890000,
      RIF: '78459602',
      RazonSocial:'Toyota C.A.',
      Estado: '',
      Ciudad: '',
      Dir: 'Calle por aqui y alla',
      fecha: '07/03/20 13:18:20',
      nrorelaciondespacho: 5,
      status: 1
    },
    {
      nro: '4',
      bultos: 300,
      valor: 457894521,
      RIF: '78457502',
      RazonSocial:'Preca Inc.',
      Estado: '',
      Ciudad: '',
      Dir: 'Calle por aqui',
      fecha: '15/03/20 15:01:25',
      nrorelaciondespacho: 8,
      status: 1
    },
    {
      nro: '5',
      bultos: 20,
      valor: 850000000,
      RIF: '78459382',
      RazonSocial:'Facturas VI, Inc.',
      Estado: '',
      Ciudad: '',
      Dir: 'Esquina por alla',
      fecha: '18/04/20 16:18:40',
      nrorelaciondespacho: 15,
      status: 1
    },
  ]
  facturastosee:any[]=[];
  facturastoedit:any[]=[];
  //Para la tabla
  relacionesDespacho:any[] = [
    {
      id: '1',
      fecha: '05/02/20 09:50:10',
      status: 'Aceptado'
    },
    {
      id: '5',
      fecha: '07/03/20 13:20:20',
      status: 'Cancelado'
    },
    {
      id: '8',
      fecha: '15/03/20 15:03:25',
      status: 'Pendiente'
    },
    {
      id: 15,
      fecha: '18/04/20 16:20:40',
      status: 'Pendiente'
    },
  ]
  constructor(
    private modalService: NgbModal,
    public pru: PruebaComponent) {
      this.tipoU = this.pru.gettipoU();
    }

  //Para crear una nueva relacion de despacho
  newRelacionDespacho(){
    const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'xl'});
    console.log("Modal result?: ", modalRef.result);
    modalRef.result.then((result) => {
      console.log("Que me trae result al cerrar modal crear? ", result)
      if(result){
        let data:any[] = result
        console.log("Que me trae data? :", data);
        //aqui se llama a la api para que traiga todas las relaciones de despacho del usuario
        this.relacionesDespacho.push(
          {
            id: 16,
            fecha: data[0].fecha,
            status: 'Pendiente'
          }
        )
      }
    }, (reason)=> {
      console.log("Reason? :", reason)
    })
  }

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

}
