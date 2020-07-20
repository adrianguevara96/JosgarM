import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import swal from 'sweetalert';
import * as moment from 'moment';
import { PdfrelaciondespachoComponent } from '../pdfrelaciondespacho/pdfrelaciondespacho.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalagregardestinatarioComponent } from '../../destinatarios/modalagregardestinatario/modalagregardestinatario.component';

@Component({
  selector: 'app-modalcrearorden',
  templateUrl: './modalcrearorden.component.html',
  styleUrls: ['./modalcrearorden.component.css']
})
export class ModalcrearordenComponent implements OnInit {

  @Input() relacionDespacho;
  @Input() accion;
  @Input() estados; //Los estados desde la clase
  @Input() ciudades; //Las ciudades desde la clase

  iduser:any;
  data:any;
  data2:any;
  facturas:any[]=[];
  facturaForm: FormGroup;
  //Lo que recibo para el modal
  ciudadxEstado:any[]=[];
  ciudadxEstados:any[]=[];
  destinatarios:any;
  direccionEntrega:any[]=[];

  esconderBoton:boolean = false;
  editrow:boolean= false; //Variable para editar la fila
  saveeditrow:boolean = false;

  //Variables para modificar o ver una relacion de despacho
  tipoAccion:any;
  numero: any;
  nrorelaciond:any;

  destinatario:any[]=[];
  //Para esconder los modales de destinatarios y direcciondeentrega
  hideModalDireccionesEntrega:boolean = false;
  hideModalDestinatario:boolean = false;
  

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private formBuilder: FormBuilder,
    public service: ServicesService,
    private spinner2: NgxSpinnerService){
      this.createForm();
      this.iduser = this.service.getIDUser();
      this.saveeditrow = false;
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
      this.tipoAccion = "Agregar";
      this.numero = "";
      this.esconderBoton = false;
      this.getDestinatarios();
    }
    console.log("Que trae al iniciar modal?: ",this.relacionDespacho, this.accion, this.estados, this.ciudades, this.tipoAccion)
  }

  createForm() {
    this.facturaForm = this.formBuilder.group({
      nro: ["", Validators.required],
      bultos: ["", Validators.required],
      valor: ["", Validators.required],
      rif: ["", Validators.required],
      razonsocial: ["", Validators.required],
      fletedestino: ["", Validators.required],
      estado: [0, Validators.required],
      ciudad: [0, Validators.required],
      direccion: ["", Validators.required],
    });
  }

  editarRow(factura:any){
    console.log(this.facturas)
    let validarFactura:boolean = true
    console.log(factura)
    for(let i =0; i<this.facturas.length; i++){
      console.log(this.facturas[i].status);
      if(this.facturas[i].status == false){
        validarFactura = false;
      }
    }
    if(validarFactura){
      factura.status = !factura.status;
    }else{
      swal("Guarde su factura", "Por favor, guarde su factura antes de editar otra factura.", "info");
    }
  }

  onSubmit() {
    if (this.facturaForm.valid) {
      console.log(this.facturaForm.value);
      this.agregarFactura();
    }else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
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
          console.log("Facturas?: ", this.facturas);
          //Crear relacion de despacho
          let relacionDespacho = {
            fecha: moment().format('L'),
            hora: moment().format('LTS'),
            idusuario: this.iduser
          }
          this.service.post(relacionDespacho, 'relaciondespacho').then((result) => {
            this.data = result
            console.log("Creando relacion despacho", this.data);
            this.nrorelaciond = this.data.nro;
            for(let i = 0; i<this.facturas.length; i++){
              let fact = {
                nro: this.facturas[i].nro,
                bultos: this.facturas[i].bultos,
                valor: this.facturas[i].valor,
                rif: this.facturas[i].rif,
                razonsocial: this.facturas[i].razonsocial,
                fletedestino: this.facturas[i].fletedestino,
                estado: this.facturas[i].estado,
                ciudad: this.facturas[i].ciudad,
                direccion:this.facturas[i].direccion,
                nrorelaciondespacho: this.data.nro,
                fecha: moment().format('L'),
                status: true
              }
              this.service.post(fact, 'factura').then((result) => {
                this.data2 = result;
                console.log(`Guardando factura ${i+1}`);
                console.log("Que resultado trae al guardar factura? ", this.data2);
              }, (err) => {
                console.log(`Error al guardar la factura ${i+1}`, err)
              })
            }
          }, (err) => {
            console.log("Error al crear la relacion de despacho ", err)
          })
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
                this.generatePDF();
                //this.activeModal.close(this.facturas)
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

  agregarFactura(){
    if(this.facturas.length <10){
      this.facturas.push({
        nro: this.facturaForm.controls["nro"].value,
        bultos: this.facturaForm.controls["bultos"].value,
        valor: this.facturaForm.controls["valor"].value,
        rif: this.facturaForm.controls["rif"].value,
        razonsocial: this.facturaForm.controls["razonsocial"].value,
        fletedestino: this.facturaForm.controls["fletedestino"].value,
        estado: this.facturaForm.controls["estado"].value,
        ciudad: this.facturaForm.controls["ciudad"].value,
        direccion: this.facturaForm.controls["direccion"].value,
        nrorelaciondespacho: this.iduser,
        fecha: moment().format('L'),
        status: true
      });
      console.log("Agregando una factura: ", this.facturas)
    }else{
      console.log("Solo se permiten 10 facturas ")
    }
  }

  eliminarFactura(pos:any){
    if(this.facturas.length > 0){
      this.facturas.splice(pos,1);
    }
  }

  generatePDF(){
    const modalRef = this.modalService.open(PdfrelaciondespachoComponent, {size: 'xl'});
    if(this.tipoAccion == "Agregar"){
      for(let i = 0; i<this.facturas.length; i++){
        this.facturas[i].nrorelaciondespacho = this.nrorelaciond;
      }
    }
    modalRef.componentInstance.facturasPDF = this.facturas;
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;
 
    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      //console.log("Que me trae result al cerrar modal del pdf? ", result)
      if(result){
        let dataa:any[] = result
        if(dataa.length > 0){
          this.activeModal.close(dataa);
        }

      }
    }, (reason)=> {
      console.log("Reason? :", reason)
    })
  }

  CiudadxEstado(idestado:any){
    console.log(idestado)
    this.ciudadxEstado = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idestado == idestado){
        this.ciudadxEstado.push(this.ciudades[j]);
      }
    }
  }
  CiudadxEstados(idestado:any){
    console.log(idestado)
    this.ciudadxEstados = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idestado == idestado){
        this.ciudadxEstados.push(this.ciudades[j]);
      }
    }
  }

  updateFactura(factura:any){
    console.log("Actualizando factura de la relacion de despacho");
    let fact = {
      nro: factura.nro,
      bultos: factura.bultos,
      valor: factura.valor,
      rif: factura.rif,
      razonsocial: factura.razonsocial,
      fletedestino: factura.fletedestino,
      estado: factura.estado,
      ciudad: factura.ciudad,
      direccion:factura.direccion,
      nrorelaciondespacho: factura.nrorelaciondespacho,
      fecha: moment().format('L')
    }
    this.service.put(fact, 'factura',fact.nro).then((result) => {
      this.data = result;
      if(this.data){
        if(this.data.message == `La factura #${factura.nro} ha sido modificada.`){
          swal("Factura Modificada", `Su factura #${factura.nro} de la relación de despacho #${factura.nrorelaciondespacho} ha sido modificada exitosamente.`, "success");
          factura.status = !factura.status;
          this.activeModal.close();
        }
      }
      //console.log(`Guardando factura #${fact.nro} editada: `, this.data)
    }, (err) => {
      console.log(`No se pudo actualizar la factura ${fact.nro}`, err)
      swal("Factura no modificada", `Lo sentimos, hubo un error al actualizar la factura #${factura.nro}. Por favor, intentalo de nuevo.`, "warning");
    })
  }

  //  M E T O D O S   P A R A   M O D A L   D E S T I N A T A R I O
  getDestinatarios(){
    this.service.get(`destinatarios/${this.iduser}`).then((result) => {
      let data:any = result;
      if(data.message == "No existen destinatarios asociados al usuario en la BD."){
        //swal("No existen destinatarios", "Ud no posee destinatarios, le invitamos a registrar sus destinatarios y a disfrutar de nuestros servicios.", "info");
      }else if(data.length > 0){
        this.destinatarios = result;
      }
    }, (err) => {
      console.log("Error al solicitar los destinatarios.")
    })
  }

  openModal(content:any, dest:any) {
    console.log("Abriendo modal: ", dest);
    this.destinatario = [];
    let destinatar = {
      nombres: dest.nombresd,
      direccion: dest.direcciond,
      estado: dest.estadod,
      ciudad: dest.ciudadd,
      rif:  dest.rifd
    }
    this.destinatario.push(destinatar);
    console.log("destinatario???? ", this.destinatario);

    this.spinner2.show();
    setTimeout(() => {
      this.spinner2.hide();
      this.getDireccionesEntxDestinatario(dest.idd);
      this.modalService2.open(content, {size: 'md'});
      //Esconde el modal de destinatario
      this.hideModalDestinatario = true;
    }, 3000);
  }

  openModalDestinatario(content1:any) {
    this.modalService2.open(content1, {size: 'md'});
  }

  //Metodo para seleccionar la direccion del destinatario
  seleccionar(objeto:any){
    console.log("Que objeto? :", objeto);
    this.facturaForm.controls['rif'].setValue(this.destinatario[0].rif);
    this.facturaForm.controls['razonsocial'].setValue(objeto.nombres);
    this.facturaForm.controls['direccion'].setValue(objeto.direccion);
    this.facturaForm.controls['estado'].setValue(objeto.estado);
    this.facturaForm.controls['ciudad'].setValue(objeto.ciudad);
    this.ciudadxEstado = [];
    for(let i = 0; i<this.ciudades.length; i++){
      if(this.ciudades[i].id == objeto.ciudad){
        this.ciudadxEstado.push(this.ciudades[i]);
      }
    }
  }

  //Metodo que se usa en el modal de destinatarios
  getDireccionesEntxDestinatario(iddestinarario:any){
    this.service.get(`direccionesentrega/${iddestinarario}`).then((result) => {
      let dato:any = result;
      if(dato.message== "No existen direcciones de entregas asociadas al destinatario en la BD."){
        this.direccionEntrega = [];
      }else{
        this.direccionEntrega = [];
        this.direccionEntrega = dato;
      }

    }, (err) => {
      console.log("Error en la busqueda de direcciones de entrega ", err)
    });
  }



}
