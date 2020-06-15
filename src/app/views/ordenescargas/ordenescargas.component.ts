import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalcrearordenComponent } from './modalcrearorden/modalcrearorden.component';

@Component({
  selector: 'app-ordenescargas',
  templateUrl: './ordenescargas.component.html',
  styleUrls: ['./ordenescargas.component.css']
})
export class OrdenescargasComponent implements OnInit {

  relacionDespacho:any[] = [
    {
      bultos: '5',
      valor: '7000000',
      RIF: '78459652',
      RazonSocial:'Facturas, Inc.',
      Estado: '',
      Ciudad: '',
      Dir: 'Calle por aqui, esquina por alla',
      fecha: '13/05/20',
      editable: false
    }
  ]
  relacionesDespacho:any[] = [
    {
      id: '1',
      fecha: '05/02/20'
    },
    {
      id: '5',
      fecha: '07/03/20'
    },
    {
      id: '8',
      fecha: '15/03/20'
    },
  ]
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }
  //Para crear una nueva relacion de despacho
  newRelacionDespacho(){
    const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'lg'});
    modalRef.result.then((result) => {
      console.log("Que me trae result al cerrar modal crear? ", result)
      if(result){
        let data:any[] = result
        console.log("Que me trae data? :", data);
        //aqui se llama a la api para que traiga todas las relaciones de despacho del usuario
        this.relacionesDespacho.push(
          {
            id: 12,
            fecha: data[0].fecha
          }
        )
        /*for(let i=0; i<data.length; i++){
          this.
        }*/
      }
    })
  }
  openModal(accion:any, i:any) {
    console.log("Entrando en OpenModal", accion, i)
    if(accion == "edit"){
      const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'lg'});
      modalRef.componentInstance.relacionDespacho = this.relacionDespacho;
      modalRef.componentInstance.accion = accion;
      //Solicitar al API la relacion despacho por el ID
    }else if(accion == "see"){ //Para ver una relacion de despacho
      const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'lg'});
      modalRef.componentInstance.relacionDespacho = this.relacionDespacho;
      modalRef.componentInstance.accion = accion;
      //Solicitar al API la relacion despacho por el ID
    }
  }
  
  seeModal(){

  }

}
