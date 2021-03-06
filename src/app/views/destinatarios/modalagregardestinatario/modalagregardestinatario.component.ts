import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal,NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-modalagregardestinatario',
  templateUrl: './modalagregardestinatario.component.html',
  styleUrls: ['./modalagregardestinatario.component.css']
})
export class ModalagregardestinatarioComponent implements OnInit {

  @Input() accion; //Lo que voy a recibir
  @Input() ciudades;
  @Input() estados;
  @Input() destinatario;
  @Input() direccionesEntrega;
  @Input() identificacion;
  @Input() nombreDest;

  destForm: FormGroup;
  direccionEntrega: FormGroup;

  tituloModal="";

  direntrega:any[]=[];
  id:any[]= [];
  iduser:any;

  data: any;
  data1:any;

  ciudadesxEstado:any[]=[];
  ciudadesxEstado2:any[]=[];
  ciudadesxEstado3:any[]=[];
  esconderBoton:boolean = false;
  editrow:boolean= false; //Variable para editar la fila

  //Variables para modificar o ver un destinatario
  tipoAccion:any;
  nombre: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public service: ServicesService,
  ) {
    this.createForm();
    this.createForm2();
    this.iduser = this.service.getIDUser();
   }

  ngOnInit() {
    if(this.accion == "see"){
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      //Hacer un for para ver las direcciones de entrega que tenga el destinatario
      //this.destinatario = [];
      this.direntrega = [];
      this.direntrega = this.direccionesEntrega;
      this.nombre = this.nombreDest;

    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = false;
      this.direntrega = [];
      this.direntrega = this.direccionesEntrega;
      if(this.direccionesEntrega.message == "No existen direcciones de entregas asociadas al destinatario en la BD."){
        this.direntrega = [];
      }
      this.llenardestForm();
      this.nombre = this.nombreDest;
      //Hacer un for para editar las direcciones de entrega que tenga el destinatario
    }else{
      this.tipoAccion = "Agregar";
      this.nombre = "";
      this.esconderBoton = false;
      this.editrow = true;
    }
  }

  createForm() {
    this.destForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      direccion: ["",Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
      tlfijo: ["", Validators.required],
      tlfmovil: ["", Validators.required],
      identificacion: ["", Validators.required],
      rif: ["", Validators.required],
    });
  }
  createForm2(){
    this.direccionEntrega = this.formBuilder.group({
      nombre:["", Validators.required],
      direccion: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
    });
  }

llenardestForm(){
  this.destForm.controls['nombre'].setValue(this.destinatario.nombresd);
  this.destForm.controls['direccion'].setValue(this.destinatario.direcciond);
  this.destForm.controls['estado'].setValue(this.destinatario.estadod);
  this.destForm.controls['ciudad'].setValue(this.destinatario.ciudadd);
  this.destForm.controls['tlfijo'].setValue(this.destinatario.tlfijod);
  this.destForm.controls['tlfmovil'].setValue(this.destinatario.tlfmovild);
  this.destForm.controls['identificacion'].setValue(this.destinatario.tid);
  this.destForm.controls['rif'].setValue(this.destinatario.rifd)
  this.ciudadesxEstado = [];
  for(let i = 0; i< this.ciudades.length; i++){
    if(this.ciudades[i].id == this.destinatario.ciudadd){
      this.ciudadesxEstado.push(this.ciudades[i]);
    }
  }
}

editarRow(direntrega:any){
  let validarFactura:boolean = true
  for(let i =0; i<this.direntrega.length; i++){
    if(this.direntrega[i].status == false){
      validarFactura = false;
    }
  }
  if(validarFactura){
    direntrega.status = !direntrega.status;
  }else{
    swal("Guarde su direccion de entrega", "Por favor, guarde su  direccion de entrega antes de editar otra direccion de entrega.", "info");
  }


  //direntrega.status = !direntrega.status;
}

  añadirDireccionEntrega(){
    if(this.tipoAccion=="Modificar"){
      let dire = {
        nombres: this.direccionEntrega.controls['nombre'].value,
        direccion: this.direccionEntrega.controls['direccion'].value,
        estado: this.direccionEntrega.controls['estado'].value,
        ciudad: this.direccionEntrega.controls['ciudad'].value,
        destinatario: this.destinatario.idd
      }
      this.service.post(dire, "direccionentrega").then( (result) => {
        let dataa:any = result;
        if(dataa.message == `La direccion de entrega de ${dire.nombres} ha sido creada.`){
          swal("Direccion de Entrega Creada", "Ud ha agregado una direccion de entrega al destinatario satisfactoriamente.","success");
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error: ${err}.`,"warning");
      })

      setTimeout(() => {
        this.getDireccionesEntxDestinatario(this.destinatario.idd);
      }, 3000);
      
      this.direccionEntrega.controls['nombre'].setValue(" ");
      this.direccionEntrega.controls['direccion'].setValue(" ");
      this.direccionEntrega.controls['estado'].setValue(" ");
      this.direccionEntrega.controls['ciudad'].setValue(" ");
    }else{
      this.direntrega.push({
        nombres: this.direccionEntrega.controls['nombre'].value,
        direccion: this.direccionEntrega.controls['direccion'].value,
        estado: this.direccionEntrega.controls['estado'].value,
        ciudad: this.direccionEntrega.controls['ciudad'].value,
        status: true
      });
  
      this.direccionEntrega.controls['nombre'].setValue(" ");
      this.direccionEntrega.controls['direccion'].setValue(" ");
      this.direccionEntrega.controls['estado'].setValue(" ");
      this.direccionEntrega.controls['ciudad'].setValue(" ");
    }

  }

  eliminarFila(){
    if(this.direntrega.length != 1){
      this.direntrega.pop();
    }
  }

  crearDestinatario(){
    if (this.destForm.valid) {
      if(this.direntrega.length==0 || this.direntrega == []){
        swal("¿Desea guardar el destinatario sin dirección de entrega?", {
          icon: "warning",
          closeOnClickOutside: false,
          buttons: {
            volver: "No",
            si: true
          },
        } as any)
        .then((value) => {
          switch (value) {
            case "si":
              let destinatario = {
                iduser: this.iduser,
                nombres: this.destForm.controls['nombre'].value,
                direccion: this.destForm.controls['direccion'].value,
                estado: this.destForm.controls['estado'].value,
                ciudad: this.destForm.controls['ciudad'].value,
                tipoidentificacion: this.destForm.controls['identificacion'].value,
                rif: this.destForm.controls['rif'].value,
                tlfijo: this.destForm.controls['tlfijo'].value,
                tlfmovil: this.destForm.controls['tlfmovil'].value,
              }
              if(this.tipoAccion == "Modificar"){
                this.service.put(destinatario, 'destinatario', this.destinatario.idd).then((result) => {
                  let answer:any = result;
                  if(answer.message == "Destinatario actualizado correctamente."){
                    swal("Modificación exitosa", "Destinatario actualizado correctamente.","info");
                    this.activeModal.close(this.direntrega);
                  }else{
                    swal("Error", `Error al modificar el destinatario.`,"warning");
                  }
                })
              }else{
                this.service.post(destinatario, 'destinatario').then( (result)=> {
                  this.data = result;
                  if(this.data.id){
                    swal("Destinatario Creado", "El destinatario ha sido creado satisfactoriamente.","success");
                    this.activeModal.close(destinatario);
                    swal.close();
                  }
                }, (err) => {
                  swal("Error del Sistema", `Ha ocurrido un error: ${err}.`,"warning");
                })
              }
              break;
            case "volver":
              swal.close();
              break;
          }
        });
      }else{
        let destinatario = {
          iduser: this.iduser,
          nombres: this.destForm.controls['nombre'].value,
          direccion: this.destForm.controls['direccion'].value,
          estado: this.destForm.controls['estado'].value,
          ciudad: this.destForm.controls['ciudad'].value,
          tipoidentificacion: this.destForm.controls['identificacion'].value,
          rif: this.destForm.controls['rif'].value,
          tlfijo: this.destForm.controls['tlfijo'].value,
          tlfmovil: this.destForm.controls['tlfmovil'].value,
        }
        if(this.tipoAccion == "Modificar"){
          this.service.put(destinatario, 'destinatario', this.destinatario.idd).then((result) => {
            let answer:any = result;
            if(answer.message == "Destinatario actualizado correctamente."){
              swal("Modificación exitosa", "Destinatario actualizado correctamente.","info");
              this.activeModal.close(this.direntrega);
            }else{
              swal("Error", `Ha ocurrido un error.`,"warning");
            }
          })
        }else{
          this.service.post(destinatario, 'destinatario').then((result)=> {
          this.data1 = result;
          if(this.data1.message == `El destinatario ${destinatario.nombres} ha sido creado.`){
            swal("Destinatario Creado", `El destinatario ${destinatario.nombres} ha sido creado satisfactoriamente.`,"success");
          }
          for (let i=0; i<this.direntrega.length; i++){
          let directrega = {
            nombres: this.direntrega[i].nombres,
            direccion: this.direntrega[i].direccion,
            estado: this.direntrega[i].estado,
            ciudad: this.direntrega[i].ciudad,
            destinatario: this.data1.id
          }
          this.service.post(directrega, 'direccionentrega').then((result) => {
            let data2 = result;
            this.activeModal.close(destinatario);
          },(err) => {
            swal("Error del Sistema", `Ha ocurrido un error: ${err}.`,"warning");
          })
        }
        },(err) => {
          swal("Error del Sistema", `Ha ocurrido un error: ${err}.`,"warning");
        })
        }
      }
    }else{
      //Aqui va un swal
      swal("Rellenar Campos", "Por favor, rellene todos los campos del destinatario.", "info");
     }
  }

  onSubmit2() {
    if (this.direccionEntrega.valid) {
      this.añadirDireccionEntrega();
    }else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos de la direccion de entrega.", "info");
    }
  }

  onSubmit(){
    
  }

  ciudadesxEstados(idest:any){
    this.ciudadesxEstado = [];
    for(let i=0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idest){
        this.ciudadesxEstado.push(this.ciudades[i]);
      }
    }
  }

  ciudadesxEstados2(idest:any){
    this.ciudadesxEstado2 = [];
    for(let i=0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idest){
        this.ciudadesxEstado2.push(this.ciudades[i]);
      }
    }
  }

  ciudadesxEstados3(idest:any){
    this.ciudadesxEstado3 = [];
    for(let i=0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idest){
        this.ciudadesxEstado3.push(this.ciudades[i]);
      }
    }
  }

  updateDireccionEntrega(dire:any){
    let directrega = {
      nombres: dire.nombres,
      direccion: dire.direccion,
      estado: dire.estado,
      ciudad: dire.ciudad,
      destinatario: dire.destinatario
    }
    this.service.put(directrega, 'direccionentrega', dire.id).then((result) => {
      this.data = result;
      if(this.data){
        if(this.data.message == `La direccion de entrega de ${dire.nombres} ha sido actualizada correctamente.`){
          swal("Direccion de Entrega Modificada", `La direccion de entrega de ${dire.nombres} ha sido modificada exitosamente.`, "success");
          dire.status = !dire.status;
          //this.activeModal.close();
        }
      }
    }, (err) => {
      swal("Factura no modificada", `Lo sentimos, hubo un error al actualizar la factura. Por favor, intentalo de nuevo.`, "warning");
    })
  }

  getDireccionesEntxDestinatario(iddestinarario:any){
    this.service.get(`direccionesentrega/${iddestinarario}`).then((result) => {
      let dato:any = result;
      this.direntrega = dato;
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error: ${err}.`,"warning");
    });
  }

  deleterDirentrega(dire:any){
    this.service.put(null, `direccionentrega/cancel`, dire.id).then( (result)=> {
      let data:any = result;
      if(data.message == "La direccion de entrega ha sido eliminada logicamente."){
        swal("Direccion de Entrega Eliminada",`La direccion de entrega de ${dire.nombres} ha sido eliminada satisfactoriamente. `,"success");
      }
    }, (err) => {
      swal("Error del Sistema",`Ha ocurrido un error del sistema, por favor, intente de nuevo La direccion de entrega de ${dire.nombres} ha sido eliminada satisfactoriamente. `,"success");
    })
  }

  //ELIMINAR DESTINATARIO
cancelarDireccionEntrega(dire:any){
  swal("¿Está seguro de eliminar este direccion de entrega?", {
    icon: "warning",
    closeOnClickOutside: false,
    buttons: {
      rechazar: "Cancelar",
      aceptar: true
    },
  } as any)
  .then((value) => {
    switch (value) {
      case "aceptar":
        this.deleterDirentrega(dire);
        this.getDireccionesEntxDestinatario(dire.destinatario);
        break;
      case "rechazar":
      swal.close();
      break;
    }
  });
}
}
