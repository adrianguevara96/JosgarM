import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ServicesService } from '../../services/services.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  trackingForm: FormGroup;
  placeholderInput:string = "Indique un nro a buscar";
  user:any;
  facturas:any[]=[];
  facturas10:any[]=[];
  status:any[] = [
    {
      id: true,
      nombre: 'Pendiente'
    },
    {
      id: false,
      nombre: 'Entregado'
    }
  ]
  estados:any;
  ciudades:any;
  daata:any[]=[];
 
  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService) { 
      this.createForm(); 
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
    //this.solicitudRecolecta = [];
    this.trackingForm = this.formBuilder.group({
      buscar: [0],
      inputBuscar: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.trackingForm.valid) {
      console.log(this.trackingForm.value);
    }
    else {
      swal("Error", `Por favor, ${this.placeholderInput}.`, "error");
      console.log(this.trackingForm.value);
    }
  }

  placehold(){
    console.log("aqui estoy", this.trackingForm.controls['buscar'].value)
    setTimeout( () => {
      if(this.trackingForm.controls['buscar'].value == 1){
        this.placeholderInput = 'Indique el nro de factura a buscar';
      }else if(this.trackingForm.controls['buscar'].value == 2){
        this.placeholderInput = 'Indique el nro de guia a buscar';
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
        }
      }
    }, (err) => {
      console.log("Error al solicitar las facturas asociadas al usuario");
    })
  }
  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      console.log("Error al hacer get a estados ", err)
    });
  };

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      console.log("Error al hacer get a ciudades ", err)
    });
  };

}
