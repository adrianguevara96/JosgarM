import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../../../services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PdfrelaciondespachoComponent } from '../../../ordenescargas/pdfrelaciondespacho/pdfrelaciondespacho.component';

@Component({
  selector: 'app-modaladminrelacionesdespachos',
  templateUrl: './modaladminrelacionesdespachos.component.html',
  styleUrls: ['./modaladminrelacionesdespachos.component.css']
})
export class ModaladminrelacionesdespachosComponent implements OnInit {

  @Input() relacionDespacho;
  @Input() accion;
  @Input() estados; //Los estados desde la clase
  @Input() ciudades; //Las ciudades desde la clase
  @Input() tiposidentificacion;
  @Input() reldespacho;
  
  
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

  totalBultos:number = 0;
  totalBsS:number = 0;

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

  visible:boolean = false;
  
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
    if(this.accion == "seeadmin"){
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      //Hacer un for para ver las facturas que hayan en la relacion de despacho
      this.facturas = [];
      this.facturas = this.relacionDespacho;
      this.llenarTotales();
      this.numero = `# ${this.facturas[0].nrorelaciondespacho}`;
    }else if(this.accion == "editadmin"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = true;
      this.facturas = [];
      this.facturas = this.relacionDespacho;
      this.llenarTotales();
      this.numero = `# ${this.facturas[0].nrorelaciondespacho}`;
      //Hacer un for para editar las facturas que hayan en la relacion de despacho
    }
  }

  llenarTotales(){
    this.totalBultos = 0;
    this.totalBsS = 0;
    for(let i=0;i<this.facturas.length;i++){
      this.totalBultos = this.totalBultos + parseInt(this.facturas[i].bultos);
      this.totalBsS = this.totalBsS + parseInt(this.facturas[i].valor);
    }
  }

  createForm() {
    this.facturaForm = this.formBuilder.group({
      nro: ["", Validators.required],
      bultos: ["", Validators.required],
      valor: ["", Validators.required],
      rif: ["", Validators.required],
      tipoidentificacion: [0, Validators.required],
      razonsocial: ["", Validators.required],
      fletedestino: ["", Validators.required],
      estado: [0, Validators.required],
      ciudad: [0, Validators.required],
      direccion: ["", Validators.required],
    });
  }

  editarRow(factura:any){
    let validarFactura:boolean = true
    for(let i =0; i<this.facturas.length; i++){
      if(this.facturas[i].status == false){
        validarFactura = false;
      }
    }
    if(validarFactura){
      this.ciudadxEstado = [];
      for(let i = 0; i<this.ciudades.length; i++){
        if(this.ciudades[i].id == factura.ciudad){
          this.ciudadxEstados.push(this.ciudades[i]);
        }
      }
      factura.status = !factura.status;
    }else{
      swal("Guarde su factura", "Por favor, guarde su factura antes de editar otra factura.", "info");
    }
  }


  eliminarFactura(fact:any, pos:any){
    this.service.delete('factura', fact.nro).then( (result) => {
      let data:any = result;
      if(data.message == `La factura #${fact.nro} ha sido eliminada fisicamente.`){
        this.facturas.slice(pos,1);
        swal("Factura Eliminada", `Su factura #${fact.nro} de la relación de despacho #${fact.nrorelaciondespacho} ha sido eliminada exitosamente.`, "success");
        this.llenarTotales();
        
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
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
    modalRef.componentInstance.tiposidentificacion = this.tiposidentificacion;
    modalRef.componentInstance.reldespacho = this.reldespacho;
 
    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa.length > 0){
          this.activeModal.close(dataa);
        }

      }
    }, (reason)=> {
    })
  }

  CiudadxEstado(idestado:any){
    this.ciudadxEstado = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idestado == idestado){
        this.ciudadxEstado.push(this.ciudades[j]);
      }
    }
  }
  CiudadxEstados(idestado:any){
    this.ciudadxEstados = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idestado == idestado){
        this.ciudadxEstados.push(this.ciudades[j]);
      }
    }
  }

  updateFactura(factura:any){
    let fact = {
      nro: factura.nro,
      bultos: factura.bultos,
      valor: factura.valor,
      rif: factura.rif,
      tipoidentificacion: factura.tipoidentificacion,
      razonsocial: factura.razonsocial,
      fletedestino: factura.fletedestino,
      estado: factura.estado,
      ciudad: factura.ciudad,
      direccion:factura.direccion,
      nrorelaciondespacho: factura.nrorelaciondespacho,
      fecha: moment().format('L')
    }
    this.service.put(fact, 'factura/nroguia', factura.nroguia).then((result) => {
      this.data = result;
      if(this.data){
        if(this.data.message == `La factura #${factura.nro} ha sido modificada.`){
          swal("Factura Modificada", `Su factura #${factura.nro} de la relación de despacho #${factura.nrorelaciondespacho} ha sido modificada exitosamente.`, "success");
          //this.visible = false;
          factura.status = !factura.status;
          this.llenarTotales();
          //this.activeModal.close();
        }
      }
    }, (err) => {
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
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

  openModal(content:any, dest:any) {
    this.destinatario = [];
    let destinatar = {
      nombres: dest.nombresd,
      direccion: dest.direcciond,
      estado: dest.estadod,
      ciudad: dest.ciudadd,
      tipoidentificacion: dest.tid,
      rif:  dest.rifd
    }
    this.destinatario.push(destinatar);

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
    this.facturaForm.controls['tipoidentificacion'].setValue(this.destinatario[0].tipoidentificacion);
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
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
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
          //Crear relacion de despacho
          let relacionDespacho = {
            fecha: moment().format('L'),
            hora: moment().format('LTS'),
            idusuario: this.iduser
          }
          this.service.post(relacionDespacho, 'relaciondespacho').then((result) => {
            this.data = result
            this.nrorelaciond = this.data.nro;
            for(let i = 0; i<this.facturas.length; i++){
              let fact = {
                nro: this.facturas[i].nro,
                bultos: this.facturas[i].bultos,
                valor: this.facturas[i].valor,
                tipoidentificacion: this.facturas[i].tipoidentificacion,
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
              }, (err) => {
                swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
              })
            }
          }, (err) => {
            swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
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

}
