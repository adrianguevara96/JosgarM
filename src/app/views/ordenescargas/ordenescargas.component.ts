import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalcrearordenComponent } from './modalcrearorden/modalcrearorden.component';

@Component({
  selector: 'app-ordenescargas',
  templateUrl: './ordenescargas.component.html',
  styleUrls: ['./ordenescargas.component.css']
})
export class OrdenescargasComponent implements OnInit {

  relacionDespacho:any[]
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
  openModal() {
    const modalRef = this.modalService.open(ModalcrearordenComponent, {size: 'lg'});
    modalRef.result.then((result) => {
      if(result){
        console.log("Que me trae? :", result);
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
  //Para ver una relacion de despacho
  seeModal(){
    const modalRef = this.modalService.open(ModalcrearordenComponent);
    modalRef.componentInstance.relacionDespacho = this.relacionDespacho;
  }

}
