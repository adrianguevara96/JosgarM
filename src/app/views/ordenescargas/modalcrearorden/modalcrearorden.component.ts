import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalcrearorden',
  templateUrl: './modalcrearorden.component.html',
  styleUrls: ['./modalcrearorden.component.css']
})
export class ModalcrearordenComponent implements OnInit {

  @Input() public relacionDespacho;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  facturas:any[]
  Estados:any[]
  Ciudades:any[]
 
  constructor(
    public activeModal: NgbActiveModal,
    public config: NgbCarouselConfig
  ) {
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

  ngOnInit(): void {
    console.log("Que trae al inciar modal?: ",this.relacionDespacho)
  }

  editarRow(i:any){
    //console.log("Que trae i: ", i)
    if(this.facturas[i].editable == false){
      this.facturas[i].editable = true;
    }
  }
  crearRelacion(){
    for(let i=0; i<this.facturas.length;i++){
      this.facturas[i].fecha = '13/05/20'
    }
    //this.passEntry.emit(this.facturas);
    this.activeModal.close(this.facturas)
    //console.log(this.facturas)
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
    //console.log(this.facturas)
  }
  eliminarFila(){
    if(this.facturas.length != 1){
      this.facturas.pop();
      //console.log(this.facturas);
    }
  }

}
