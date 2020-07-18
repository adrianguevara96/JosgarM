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
      console.log("Entre aqui por la opcion SEE");     
      console.log("direccionesEntrega ", this.direccionesEntrega);
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      //Hacer un for para ver las direcciones de entrega que tenga el destinatario
      //this.destinatario = [];
      this.direntrega = [];
      this.direntrega = this.direccionesEntrega;
      console.log("Destinatario trae ", this.destinatario);
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
    console.log("Que trae al iniciar modal?: ",this.destinatario, this.accion, this.identificacion, this.estados, this.ciudades)
    console.log(this.tipoAccion);
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
  console.log("casi entro");
  this.ciudadesxEstado = [];
  for(let i = 0; i< this.ciudades.length; i++){
    console.log(" entro");
    if(this.ciudades[i].id == this.destinatario.ciudadd){
      this.ciudadesxEstado.push(this.ciudades[i]);
    }
  }
}

  editarRow(direntrega:any){
    direntrega.status = !direntrega.status;
  }

  añadirDireccionEntrega(){
    if(this.direntrega.length <5){
      if(this.tipoAccion=="Modificar"){
        let dire = {
          nombres: this.direccionEntrega.controls['nombre'].value,
          direccion: this.direccionEntrega.controls['direccion'].value,
          estado: this.direccionEntrega.controls['estado'].value,
          ciudad: this.direccionEntrega.controls['ciudad'].value,
          destinatario: this.destinatario.idd
        }
        this.service.post(dire, "direccionentrega").then((result) => {
          let dataa:any = result;
          console.log("Result direccionentrega ", dataa);
        })
      }
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
    }else{
      console.log("Direccion entrega length>5 ", this.direntrega);
    }
    console.log('Direccion entrega ',this.direntrega);
  }

  eliminarFila(){
    if(this.direntrega.length != 1){
      this.direntrega.pop();
    }
  }

  crearDestinatario(){
    console.log("Entrando al metodo crearDestinatario ");
    if (this.destForm.valid) {
      console.log("DIRENTREGA ", this.direntrega);
      if(this.direntrega.length==0 || this.direntrega == []){
        swal("¿Desea guardar el destinatario sin dirección?", {
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
                  console.log("answer ", answer);
                  if(answer.message == "Destinatario actualizado correctamente."){
                    swal("Modificación exitosa", "Destinatario actualizado correctamente.","info");
                    this.activeModal.close(this.direntrega);
                  }else{
                    console.log("Error al modificar el destinatario");
                  }
                })
              }else{
                this.service.post(destinatario, 'destinatario').then((result)=> {
                  this.data = result;
                  console.log("data post ", this.data);
                })
                this.activeModal.close(this.direntrega)
                swal.close();
              }
              break;
            case "volver":
              swal.close();
              break;
          }
        });
      }else{
        console.log("else ", this.data1);
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
            console.log("answer ", answer);
            if(answer.message == "Destinatario actualizado correctamente."){
              swal("Modificación exitosa", "Destinatario actualizado correctamente.","info");
              this.activeModal.close(this.direntrega);
            }else{
              console.log("Error al modificar el destinatario");
            }
          })
        }else{
           this.service.post(destinatario, 'destinatario').then((result)=> {
           this.data1 = result;
           console.log("data1 result ", this.data1);

           console.log("Antes del for ", this.data1);
          for (let i=0; i<this.direntrega.length; i++){
          console.log("Entrando al for ", this.data1.id);
          let directrega = {
            nombres: this.direntrega[i].nombre,
            direccion: this.direntrega[i].direccion,
            estado: this.direntrega[i].estado,
            ciudad: this.direntrega[i].ciudad,
            destinatario: this.data1.id
          }
          this.service.post(directrega, 'direccionentrega').then((result) => {
            let data2 = result;
            console.log('DireccionE guardada ', data2);
          },(err) => {
            console.log("Error al guardar la direccion de entrega ", err);
          })
        }
        },(err) => {
          console.log("Error al crear el destinatario ", err);
          })
        }
      }
    }else{
       alert('Complete el formulario ');
     }
  }

  onSubmit2() {
    if (this.direccionEntrega.valid) {
      console.log("onsubmit2 ", this.destForm.value);
      this.añadirDireccionEntrega();
    }
    else {
      console.log("Direccion Entrega ", this.direccionEntrega.value);
      alert("FILL ALL FIELDS");
    }
  }

  ciudadesxEstados(idest:any){
    this.ciudadesxEstado = [];
    console.log("Ciudades x estado ")
    for(let i=0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idest){
        this.ciudadesxEstado.push(this.ciudades[i]);
      }
    }
  }
 
}
