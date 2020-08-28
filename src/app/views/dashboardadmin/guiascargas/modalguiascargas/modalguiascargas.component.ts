import { Component, OnInit, Input } from '@angular/core';
import { ServicesService } from '../../../../services/services.service';
import swal from 'sweetalert';
import * as moment from 'moment';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PdfguiascargasComponent } from './../pdfguiascargas/pdfguiascargas.component';

@Component({
  selector: 'app-modalguiascargas',
  templateUrl: './modalguiascargas.component.html',
  styleUrls: ['./modalguiascargas.component.css']
})
export class ModalguiascargasComponent implements OnInit {

  @Input() rutas;
  @Input() ciudades;
  @Input() accion;
  @Input() guia;
  @Input() facturas;

  guiaForm: FormGroup;
  modalForm: FormGroup; //Para el modal

  ciudadesxRuta:any[]=[];
  guiacarga:any[]=[];
  guiacarga2:any[]=[];
  totalBultos:number = 0;
  totalBsS:number = 0;
  data:any;
  data2:any;
  nroguiacarga:number;

  nombrechofer = "";
  cedulachofer = "";
  montoliquidacion = 0;

  tipoAccion:any;
  numero: any;
  esconderBoton:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public service: ServicesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
      this.createForm();
      this.createForm2();
     }

  ngOnInit(){
    if(this.accion == "see"){
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      this.numero = `# ${this.guia.nro}`;
      this.guiacarga = [];
      this.guiacarga = this.facturas;
      this.llenarTotales();
      if(this.guia != undefined){
        this.nombrechofer = this.guia.chofer;
        this.cedulachofer = this.guia.cedula;
        this.montoliquidacion = this.guia.montoliquidacion;
      }
    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = true;
      this.guiacarga = [];
      this.guiacarga = this.facturas;
      this.numero = `# ${this.guia.nro}`;
      this.llenarTotales();
      if(this.guia != undefined){
        this.nombrechofer = this.guia.chofer;
        this.cedulachofer = this.guia.cedula;
        this.montoliquidacion = this.guia.montoliquidacion;
      }
      //Hacer un for para editar las facturas que hayan en la relacion de despacho
    }else{
      this.tipoAccion = "Agregar";
      this.numero = "";
      this.esconderBoton = false;
    }
  }

  createForm() {
    this.guiaForm = this.formBuilder.group({
      nombrechofer: ["", Validators.required],
      cedulachofer: ["", Validators.required],
      montoliquidacion: [0,Validators.required],
      ruta: [0, Validators.required],
      ciudad: [0, Validators.required],
    });
  }
  //Para el modal
  createForm2() {
    this.modalForm = this.formBuilder.group({
      ruta2: [0, Validators.required],
      ciudad2: [0, Validators.required],
    });
  }

  onSubmit() {
    if (this.guiaForm.valid) {
      this.buscarFacturas(this.guiaForm.controls['ciudad'].value);
      this.guiaForm.controls['ruta'].setValue(0);
      this.guiaForm.controls['ciudad'].setValue(0);
      this.ciudadesxRuta = [];
    }else {
      swal("Seleccione los campos", "Por favor, seleccione todos los campos.", "info");
    }
  }

  //Para el modal
  onSubmit2() {
    if (this.modalForm.valid) {
      this.buscarFacturas(this.modalForm.controls['ciudad2'].value);
      this.modalForm.controls['ruta2'].setValue(0);
      this.modalForm.controls['ciudad2'].setValue(0);
      this.ciudadesxRuta = [];
    }else {
      swal("Seleccione los campos", "Por favor, seleccione todos los campos.", "info");
    }
  }

  CiudadesxRuta(idruta:any){
    this.ciudadesxRuta = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idruta == idruta){
        this.ciudadesxRuta.push(this.ciudades[j]);
      }
    }
  }

  buscarFacturas(ciudad:any){
    if(this.accion == 'edit'){
      this.service.get(`facturas/ciudad/${ciudad}`).then( (result) => {
        let data:any = result;
        if(data.message == "No existen las facturas en la BD."){
          swal("No existen facturas", "No existen facturas por entregar para esa ruta y ciudad. Por favor, seleccione otra ruta y otra ciudad.", "info");
        }else{
          this.guiacarga2 = data;
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }else if(this.accion == 'create'){
      this.service.get(`facturas/ciudad/${ciudad}`).then( (result) => {
        let data:any = result;
        if(data.message == "No existen las facturas en la BD."){
          swal("No existen facturas", "No existen facturas por entregar para esa ruta y ciudad. Por favor, seleccione otra ruta y otra ciudad.", "info");
        }else{
          for(let i=0;i<data.length;i++){
            this.guiacarga.push(data[i])
            this.totalBultos = this.totalBultos + data[i].bultos;
            this.totalBsS = this.totalBsS + parseInt(data[i].valor);
          }
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }
  }

  llenarTotales(){
    this.totalBultos = 0;
    this.totalBsS = 0;
    for(let i=0;i<this.guiacarga.length;i++){
      this.totalBultos = this.totalBultos + parseInt(this.guiacarga[i].bultos);
      this.totalBsS = this.totalBsS + parseInt(this.guiacarga[i].valor);
    }
  }
  quitarTotales(){

  }

  eliminarFactura(i:any, guia:any){
    this.totalBultos = this.totalBultos - guia.bultos;
    this.totalBsS = this.totalBsS - parseInt(guia.valor);
    this.guiacarga.splice(i,1);
  }

  eliminarFactura2(i:any, g:any){
    this.guiacarga2.splice(i,1);
  }

  //Para el modal, agrega una factura cuando se modifica una guia de carga
  agregarFacturaGuiaCarga(g:any, i:any){
    let fact = {
      nroguiacarga: this.facturas[0].nroguiacarga
    }
    this.service.put(fact, 'factura/nroguiacarga', g.nrof+"/"+g.nrorelaciondespacho).then((result) => {
      this.data2 = result;
      if(this.data2.message == `La factura #${g.nrof} ha sido modificada.`){
        this.guiacarga2.splice(i,1);
        this.getFacturasxNroGuiaCarga(this.guia.nro);
        
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

  quitarFacturaGuiaCarga(guia:any){
    this.service.put(null,'factura/cancelunnroguiacarga', guia.nroguiacarga+"/"+guia.nrorelaciondespacho+"/"+guia.nrof).then((result) => {
      this.data = result;
      if(this.data.message == "El nroguiacarga de la factura ha sido eliminado logicamente."){
        swal("Factura Retirada", `Se ha retirado la factura de la guia de carga #${guia.nroguiacarga} satisfactoriamente`, "success");
        this.getFacturasxNroGuiaCarga(this.guia.nro);
        this.totalBultos = this.totalBultos - guia.bultos;
        this.totalBsS = this.totalBsS - parseInt(guia.valor);
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al cancelar las facturas de su relacion de despacho. Por favor, intentelo de nuevo.", "warning");
    })
  }

  agregarTodasFacturaGuiaCarga(){
    let fact = {
      nroguiacarga: this.nroguiacarga
    }
    for(let i = 0; i<this.guiacarga2.length; i++){
      this.service.put(fact, 'factura/nroguiacarga', this.guiacarga2[i].nrof+"/"+this.guiacarga2[i].nrorelaciondespacho).then((result) => {
        this.data2 = result;
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
      })
    }
  }

  crearGuiaCarga(){
    if(this.guiacarga.length == 0){
      swal("No hay facturas en la guia de carga", "Por favor, seleccione alguna factura para llenar la guia de carga.", "info");
    }else if(this.guiaForm.controls['cedulachofer'].value == "" && this.guiaForm.controls['nombrechofer'].value == ""){
      swal("Complete los campos", "Por favor, ingrese el nombre y la cedula de chofer.", "info");
    }else{
      swal("¿Está seguro de crear esta nueva guía de carga?", {
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
            //Crear guia de carga
            let guiacarga = {
              cedula: this.guiaForm.controls['cedulachofer'].value,
              chofer: this.guiaForm.controls['nombrechofer'].value,
              montoliquidacion: this.guiaForm.controls['montoliquidacion'].value,
              fecha: moment().format('L'),
              usuario: this.service.getIDUser()
            }
            this.service.post(guiacarga, 'guiacarga').then((result) => {
              this.data = result
              this.nroguiacarga = this.data.nro;
              let fact = {
                nroguiacarga: this.nroguiacarga
              }
              for(let i = 0; i<this.guiacarga.length; i++){
                this.service.put(fact, 'factura/nroguiacarga', this.guiacarga[i].nrof+"/"+this.guiacarga[i].nrorelaciondespacho).then((result) => {
                  this.data2 = result;
                }, (err) => {
                  swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
                })
              }
            }, (err) => {
              swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
            })
            this.activeModal.close(this.guiacarga);
            break;
          case "cancel":
          swal.close();
          break;
        }
      });
    }
  }

  generatePDF(){
    const modalRef = this.modalService.open(PdfguiascargasComponent, {size: 'xl'});
    let gc = {
      nombre: this.nombrechofer,
      cedula: this.cedulachofer,
      montoliquidacion: this.montoliquidacion,
      accion: this.accion
    }
    modalRef.componentInstance.guiacarga = this.guiacarga;
    modalRef.componentInstance.ciudades = this.ciudades;
    modalRef.componentInstance.totalBultos = this.totalBultos;
    modalRef.componentInstance.totalBsS = this.totalBsS;
    modalRef.componentInstance.nroguiacarga = this.facturas[0].nroguiacarga;
    modalRef.componentInstance.gc = gc
  }

  openModalGuiadeCarga(content:any) {
    const modalx = this.modalService.open(content, {size: 'lg'});

    //Lo que me trae el modal al cerrarse
    modalx.result.then((result) => {
    }, (reason)=> {
    })
  }

  getFacturasxNroGuiaCarga(nroguiacarga:any){
    this.service.get(`facturas/nroguiacarga/${nroguiacarga}`).then((result) => {
      let dato:any = result;
      this.guiacarga = [];
      this.guiacarga = dato;
      this.llenarTotales();
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  modificarGuiaCarga(){
    let guiacarga = {
      chofer: this.nombrechofer,
      cedula: this.cedulachofer,
      montoliquidacion: this.montoliquidacion
    }
    this.service.put(guiacarga,'guiacarga/chofer',this.facturas[0].nroguiacarga).then((result) =>{
      let data:any = result;
      if(data.message == "El chofer y su cedula han sido agregados a la guia de carga correctamente."){
        swal("Guia de Carga Modificada", `Se ha modificado la guia de carga #${this.facturas[0].nroguiacarga} satisfactoriamente`, "success");
        this.activeModal.close(this.guiacarga)
      }else{
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

}
