import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal,NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

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

  destForm: FormGroup;
  direccionEntrega: FormGroup;

  tituloModal="";

  direntrega:any[]=[];
  id:any[]= [];
  
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
  ) {
    this.createForm();
    this.createForm2();
   }

  ngOnInit(): void {
    if(this.accion == "see"){
      console.log("Entre aqui por la opcion SEE");     
      console.log("direccionesEntrega ", this.direccionesEntrega);
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      //Hacer un for para ver las direcciones de entrega que tenga el destinatario
      //this.destinatario = [];
      this.destinatario = this.destinatario;
      console.log("Destinatario trae ", this.destinatario);
      this.nombre = `# ${this.destinatario[0].nombresd}`;

    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = true;
      this.destinatario = [];
      this.destinatario = this.destinatario;
      this.nombre = `# ${this.destinatario[0].nombresd}`;
      //Hacer un for para editar las direcciones de entrega que tenga el destinatario
    }else{
      this.tipoAccion = "Agregar";
      this.nombre = "";
      this.esconderBoton = false;
      this.editrow = true;
    }
    console.log("Que trae al iniciar modal?: ",this.destinatario, this.accion)
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
  editarRow(direntrega:any){
    direntrega.status = !direntrega.status;
  }

  añadirDireccionEntrega(){
    if(this.direntrega.length <5){
      this.direntrega.push({
        nombre: this.direccionEntrega.controls['nombre'].value,
        direccion: this.direccionEntrega.controls['direccion'].value,
        estado: this.direccionEntrega.controls['estado'].value,
        ciudad: this.direccionEntrega.controls['ciudad'].value,
        editable: false
      });
    }
    console.log(this.direntrega)
  }

  eliminarFila(){
    if(this.direntrega.length != 1){
      this.direntrega.pop();
    }
  }

  onSubmit() {
    if (this.destForm.valid) {
      console.log(this.destForm.value);
      if(this.direntrega.length==0){
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
              this.activeModal.close(this.direntrega)
              swal.close();
              break;
            case "volver":
              swal.close();
              break;
          }
      });
    }else {
      alert("FILL ALL FIELDS");
    }
  }
}
  onSubmit2() {
    if (this.direccionEntrega.valid) {
      console.log(this.destForm.value);
      this.añadirDireccionEntrega();
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }

  ciudadesxEstados(idest:any){
    this.ciudadesxEstado = [];
    for(let i=0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idest){
        this.ciudadesxEstado.push(this.ciudades[i]);
      }
    }
  }
 
}