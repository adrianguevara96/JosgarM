import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-modalcrearorden',
  templateUrl: './modalcrearorden.component.html',
  styleUrls: ['./modalcrearorden.component.css']
})
export class ModalcrearordenComponent implements OnInit {

  @Input() relacionDespacho;
  @Input() accion; //Lo que voy a recibir
  @Input() tipoU;

  facturas:any[]=[];
  Estados:any[]=[];
  Ciudades:any[]=[];
  esconderBoton:boolean = false;
  editrow:boolean= false; //Variable para editar la fila

  //Variables para modificar o ver una relacion de despacho
  tipoAccion:any;
  numero: any;

  constructor(
    public activeModal: NgbActiveModal,
    public config: NgbCarouselConfig
  ){
    config.wrap = false;  
    config.keyboard = false;  
    config.pauseOnHover = false;  

    this.facturas = [
      {
        nro: '',
        bultos: '',
        valor: '',
        RIF: '',
        RazonSocial:'',
        Estado: '',
        Ciudad: '',
        Dir: '',
        fecha: '',
        status: '',
        nrorelaciondespacho: '',
      }
    ];
   }

  ngOnInit() {
    if(this.accion == "see"){
      console.log("Entre aqui por la opcion SEE")
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      //Hacer un for para ver las facturas que hayan en la relacion de despacho
      this.facturas = [];
      this.facturas = this.relacionDespacho;
      this.numero = `# ${this.facturas[0].nrorelaciondespacho}`;
    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = true;
      this.facturas = [];
      this.facturas = this.relacionDespacho;
      this.numero = `# ${this.facturas[0].nrorelaciondespacho}`;
      //Hacer un for para editar las facturas que hayan en la relacion de despacho
    }else{
      this.tipoAccion = "Agregar"
      this.numero = ""
      this.esconderBoton = false
    }
    console.log("Que trae al iniciar modal?: ",this.relacionDespacho, this.accion)
    console.log(this.tipoAccion);
  }

  editarRow(i:any){
    if(this.accion=="see"){
      this.editrow = false;
    }else{
      this.editrow = true;
    }
  }
  crearRelacion(){
    swal("¿Está seguro de crear esta nueva relación de despacho?", {
      icon: "warning",
      closeOnClickOutside: false,
      buttons: {
        cancel: "Cancelar",
        guardar: true
      },
    } as any)
    .then((value) => {
      switch (value) {
        case "guardar":
          console.log("Guardando ...")
          for(let i=0; i<this.facturas.length;i++){
            this.facturas[i].fecha = '13/05/20 10:15:35'
          }
          swal("¿Desea imprimir esta relación de despacho?", {
            icon: "info",
            closeOnClickOutside: false,
            buttons: {
              rechazar: "No",
              imprimir: true
            }
          } as any)
          .then((value) => {
            switch (value) {
              case "imprimir":
                console.log("Generando PDF ...");
                this.activeModal.close(this.facturas)
                swal.close();
                break;
              case "rechazar":
                this.activeModal.close(this.facturas)
                swal.close();
                break;
            }
          });
          break;
        case "cancel":
        swal.close();
        break;
      }
    });
  }


  agregarFila(){
    if(this.facturas.length >=1 && this.facturas.length <=5)
    this.facturas.push({
      bultos: '',
      valor: '',
      RIF: '',
      RazonSocial:'',
      Estado: '',
      Ciudad: '',
      Dir: '',
      fecha: '',
      editable: false
    });
  }

  eliminarFila(){
    if(this.facturas.length != 1){
      this.facturas.pop();
    }
  }

}
