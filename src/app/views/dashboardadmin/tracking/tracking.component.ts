import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import swal from 'sweetalert';
import * as moment from 'moment';



@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  closeResult = '';
  trackingForm: FormGroup;
  tracking2Form: FormGroup;
  placeholderInput:string = "Indique un nro a buscar";
  tituloModal = "";
  user:any;
  facturas:any[]=[];
  statusfact:any[] = [
    {
      id: 0,
      nombre: 'Pendiente'
    },
    {
      id: 1,
      nombre: 'Entregado'
    },

  ]
  estados:any;
  ciudades:any;
  rutas:any;
  daata:any[]=[];
  factguia:any[]=[];

  factparafechaentrega:any;
  fechaentrega:any;

  ciudadesxRuta:any[] = [];

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
    this.getFacturasxUsuario();
    this.getCiudades();
    this.getEstados();
    this.getRutas();
  }

  createForm() {
    //this.solicitudRecolecta = [];
    this.trackingForm = this.formBuilder.group({
      buscar: [0],
      inputBuscar: ["", Validators.required],
    });
    this.tracking2Form = this.formBuilder.group({
      ruta: [0, Validators.required],
      //ciudad: [0, Validators.required],
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

  onSubmit2() {
    if (this.tracking2Form.valid) {
      this.buscarFacturasxRuta(this.tracking2Form.controls['ruta'].value);
      //this.tracking2Form.controls['ruta'].setValue(0);
      //this.tracking2Form.controls['ciudad'].setValue(0);
      //this.ciudadesxRuta = [];
    }else {
      swal("Seleccione los campos", "Por favor, seleccione todos los campos.", "info");
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
    this.service.get(`facturas/sfe`).then((result) => {
      let datta:any = result;
      if(datta){
        if(datta.message == "No existen facturas por entregar en la BD."){
          swal("No existen facturas", "No existen facturas por entregar sus bultos.", "info");
        }else if(datta.length > 0){
          this.facturas = [];
          this.facturas = datta;
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
  };

  getRutas(){
    this.service.get('rutas').then((result) => {
      this.rutas = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };


  open(content) {
    this.modalService.open(content, {size: 'lg'});
  }

  aceptarFactura(fact:any, content2){
    this.modalService.open(content2, {size: 'md'});
    this.factparafechaentrega = fact;
  }

  guardarFechaEntrega(){
    if(moment(this.fechaentrega).format('L')>moment().format('L')){
      swal("Error", `No se puede colocar una fecha mayor a la actual. Por favor especifique una fecha inferior o igual a la actual`, "info");
    }else if(this.fechaentrega != undefined){
      let fact = {
        fechaentrega: moment(this.fechaentrega).format('L')
      }
      this.service.put(fact,'factura/fechaentrega',this.factparafechaentrega.nrof+"/"+this.factparafechaentrega.nrorelaciondespacho).then( (result) =>{
        let data:any = result;
        if(data.message == `La factura #${this.factparafechaentrega.nrof} ha sido modificada.`){
          swal("Fecha de Entrega Agregada", `Se ha agregado la fecha de entrega ${fact.fechaentrega} a la factura # ${this.factparafechaentrega.nrof}`, "success");
          //this.getFacturasxUsuario();
          this.buscarFacturasxRuta(this.tracking2Form.controls['ruta'].value);
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }else{
      swal("Especifique una fecha", `Por favor, especifique una fecha inferior o igual a la fecha actual.`, "info");
    }
  }

  buscarFacturasxRuta(ruta:any){
    this.service.get(`facturas/tracking/ruta/${ruta}`).then( (result) => {
      let data:any = result;
      if(data.message == "No existen las facturas en la BD."){
        swal("No existen facturas", "No existen facturas por entregar para esa ruta. Por favor, seleccione otra ruta.", "info");
      }else{
        this.facturas = [];
        this.facturas = data;
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

  CiudadesxRuta(idruta:any){
    this.ciudadesxRuta = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idruta == idruta){
        this.ciudadesxRuta.push(this.ciudades[j]);
      }
    }
  }
}
