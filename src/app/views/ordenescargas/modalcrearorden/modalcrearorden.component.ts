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
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  facturas:any[]
  Estados:any[]
  Ciudades:any[]
  esconderBoton:boolean = false;

  //Variables para modificar o ver una relacion de despacho
  tipoAccion:any;
  numero: any;
  
  constructor(
    public activeModal: NgbActiveModal,
    public config: NgbCarouselConfig
  ) {
    console.log("Estoy aqui tambien .-.")
    config.wrap = false;  
    config.keyboard = false;  
    config.pauseOnHover = false;  

    this.facturas = [
      {
        bultos: '',
        valor: '',
        RIF: '',
        RazonSocial:'',
        Estado: '',
        Ciudad: '',
        Dir: '',
        fecha: '',
        editable: false
      }
    ]
   }

  ngOnInit() {
    if(this.accion == "see"){
      console.log("Entre aqui por la opcion SEE")
      this.tipoAccion = "Ver"
      this.numero = "#1"
      this.esconderBoton = true
      //Hacer un for para ver las facturas que hayan en la relacion de despacho
      this.facturas = this.relacionDespacho
    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar"
      this.numero = "#1"
      this.esconderBoton = true
      //Hacer un for para editar las facturas que hayan en la relacion de despacho
    }else{
      this.tipoAccion = "Agregar"
      this.numero = ""
      this.esconderBoton = false
    }
    console.log("Que trae al iniciar modal?: ",this.relacionDespacho)
    console.log("Que trae al iniciar modal?: ",this.accion)
    console.log(this.tipoAccion);
  }

  editarRow(i:any){
    //console.log("Que trae i: ", i)
    if(this.facturas[i].editable == false && this.accion=="see"){
      this.facturas[i].editable = false;
    }else{
      this.facturas[i].editable = true;
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
            this.facturas[i].fecha = '13/05/20'
          }
          swal("¿Desea imprimir esta relación de despacho?", {
            icon: "info",
            closeOnClickOutside: false,
            buttons: {
              cancel: "No",
              imprimir: true
            }
          } as any)
          .then((value) => {
            switch (value) {
              case "imprimir":
                console.log("Generando PDF ...");
                this.activeModal.close(this.facturas)
                break;
              case "cancel":
                this.activeModal.close(this.facturas)
                swal.close();
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
