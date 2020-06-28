import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ModalagregardestinatarioComponent } from './modalagregardestinatario/modalagregardestinatario.component';

@Component({
  selector: 'app-destinatarios',
  templateUrl: './destinatarios.component.html',
  styleUrls: ['./destinatarios.component.css']
})
export class DestinatariosComponent implements OnInit {

  destinatario:any[];
  destinatarios:any[] = [
    {
      nombre: 'nombre1',
      rif: '12345678',
      tmovil:'(1234)1234567',
      tlocal:'(1234)234567',
      dir:'direccion1',
      est:'estado1',
      ciudad:'ciudad1'
    },
    {
      nombre: 'nombre2',
      rif: '12345678',
      tmovil:'(1234)1234567',
      tlocal:'(1234)234567',
      dir:'direccion2',
      est:'estado2',
      ciudad:'ciudad2'
    },
    {
      nombre: 'nombre3',
      rif: '12345678',
      tmovil:'(1234)1234567',
      tlocal:'(1234)234567',
      dir:'direccion3',
      est:'estado3',
      ciudad:'ciudad3'
    },
  ]
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openModal() {
    const modalRef = this.modalService.open(ModalagregardestinatarioComponent, {size: 'lg'});
    modalRef.result.then((result) => {
      if(result){
        console.log("Que me trae? :", result);
        let data:any[] = result
        console.log("Que me trae data? :", data);
        //aqui se llama a la api para que traiga todas las relaciones de despacho del usuario
        this.destinatarios.push(
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
  seeModal(){
    const modalRef = this.modalService.open(ModalagregardestinatarioComponent);
    modalRef.componentInstance.relacionDespacho = this.destinatario;
  }

}
