import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ServicesService } from '../../services/services.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  closeResult = '';
  trackingForm: FormGroup;
  placeholderInput:string = "Indique un nro a buscar";
  tituloModal = "";
  user:any;
  facturas:any[]=[];
  facturas10:any[]=[];
  status:any[] = [
    {
      id: 0,
      nombre: 'Pendiente'
    },
    {
      id: 1,
      nombre: 'Entregado'
    }
  ]
  estados:any;
  ciudades:any;
  daata:any[]=[];
  factguia:any[]=[];
 
  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService,
    private modalService: NgbModal,
    config: NgbModalConfig) { 
      this.createForm();
      config.backdrop = 'static';
      config.keyboard = false; 
    }

  ngOnInit(){
    this.user = this.service.getUser();
    this.getFacturasxUsuario();
    this.getCiudades();
    this.getEstados();
  }

  //Para la paginacion
  pageChanged(event: PageChangedEvent){
    //Event page: Pagina actual  ItemsPerPage: Datos por pagina.
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.facturas10 = this.facturas.slice(startItem, endItem);
  }

  createForm() {
    this.trackingForm = this.formBuilder.group({
      buscar: [0],
      inputBuscar: ["", Validators.required],
    });
  }

  onSubmit(content) {
    if (this.trackingForm.valid && (this.trackingForm.controls['buscar'].value == 1 || this.trackingForm.controls['buscar'].value == 2)) {
      if(this.trackingForm.controls['buscar'].value == 1){
        this.factguia = [];
        for(let i=0; i<this.facturas.length; i++){
          if(this.facturas[i].nrof == this.trackingForm.controls['inputBuscar'].value){
            this.factguia.push(this.facturas[i]);
          }
        }
        if(this.factguia.length != 0){
          this.open(content);
        }else{
          swal("No existe", `No existe el nro de factura que esta buscando`, "info");
        }
      }else if(this.trackingForm.controls['buscar'].value == 2){
        this.factguia = [];
        for(let i=0; i<this.facturas.length; i++){
          if(this.facturas[i].nroguia == this.trackingForm.controls['inputBuscar'].value){
            this.factguia.push(this.facturas[i]);
          }
        }
        if(this.factguia.length != 0){
          this.open(content);
        }else{
          swal("No existe", `No existe el nro de guia que esta buscando`, "info");
        }
        
      }
    }else {
      if(this.trackingForm.controls['inputBuscar'].value == ""){
        swal("Error", `Por favor, ${this.placeholderInput}.`, "error");
      }else if(this.trackingForm.controls['buscar'].value == 0){
        swal("Error", `Por favor, indique una opcion para buscar.`, "error");
      }
    }
  }

  placehold(){
    setTimeout( () => {
      if(this.trackingForm.controls['buscar'].value == 1){
        this.placeholderInput = 'Indique el nro de factura a buscar';
        this.tituloModal = 'Factura';
      }else if(this.trackingForm.controls['buscar'].value == 2){
        this.placeholderInput = 'Indique el nro de guia a buscar';
        this.tituloModal = 'Guía';
      }
    },200);
  }

  getFacturasxUsuario(){
    this.service.get(`facturas/user/${this.user.id}`).then((result) => {
      let datta:any = result;
      if(datta){
        if(datta.message == "No existen facturas asociadas a ese usuario en la BD."){
          swal("No existen facturas", "El usuario no posee facturas asociadas. Le invitamos a crear una relacion de despacho y a disfrutar de nuestros servicios.", "info");
        }else if(datta.length > 0){
          this.facturas = [];
          this.facturas = datta;
          this.facturas10 = this.facturas.slice(0, 10);
        }
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
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
  }

  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

}
