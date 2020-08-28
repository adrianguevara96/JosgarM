import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import * as moment from 'moment';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-modalsolicitudrecolecta',
  templateUrl: './modalsolicitudrecolecta.component.html',
  styleUrls: ['./modalsolicitudrecolecta.component.css']
})
export class ModalsolicitudrecolectaComponent implements OnInit {

  @Input() solicitudReco; //Lo que me envia para el modal
  @Input() accion;
  @Input() estados;
  @Input() ciudades;
  @Input() tiposmercancia;

  esconderBoton:boolean = false;
  tipoAccion:any;
  numero: any;
  see:boolean = false;

  solicitudRecolectaForm: FormGroup;
  solicitudRecolecta:any[]=[];
  ciudadxEstado:any[]=[];
  iduser:any;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public service: ServicesService) { 
    this.createForm();
    this.iduser = this.service.getIDUser()
  }

  ngOnInit(){
    if(this.accion == "see"){
      //console.log("Entre aqui por la opcion SEE")
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      this.see = true;
      //Hacer un for para ver las facturas que hayan en la relacion de despacho
      this.solicitudRecolecta = [];
      this.solicitudRecolecta = this.solicitudReco;
      this.numero = `# ${this.solicitudRecolecta[0].nro}`;
    }else if(this.accion == "edit"){
      this.tipoAccion = "Editar";
      this.solicitudRecolecta = [];
      this.solicitudRecolecta = this.solicitudReco;
      this.numero = `# ${this.solicitudRecolecta[0].nro}`;
      this.esconderBoton = true;
      this.llenarForm();
    }else{
      this.tipoAccion = "Agregar";
      this.numero = "";
      this.esconderBoton = false;
    }
  }

  createForm() {
    this.solicitudRecolectaForm = this.formBuilder.group({
      bultos: ["", Validators.required],
      tipomercancia: [0, Validators.required],
      fecha: ["", Validators.required],
      hora: ["", Validators.required],
      estado: [0, Validators.required],
      ciudad: [0, Validators.required],
      direccion: ["", Validators.required],
      observacion: [""]
    });
  }

  onSubmit() {
    if (this.solicitudRecolectaForm.valid) {
      console.log(typeof this.solicitudRecolectaForm.controls["hora"].value)
      console.log(this.solicitudRecolectaForm.value);
      swal("¿Está seguro de crear esta solicitud de recolecta?", {
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
            console.log("Guardando ...");
            this.agregarSolicitudRecolecta();
            break;
          case "cancel":
          swal.close();
          break;
        }
      });
    }
    else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
    }
  }

  limpiar(){
    this.solicitudRecolectaForm.controls['bultos'].setValue(" ");
    this.solicitudRecolectaForm.controls['tipomercancia'].setValue(" ");
    this.solicitudRecolectaForm.controls['fecha'].setValue(" ");
    this.solicitudRecolectaForm.controls['hora'].setValue(" ");
    this.solicitudRecolectaForm.controls['estado'].setValue(0);
    this.solicitudRecolectaForm.controls['ciudad'].setValue(0);
    this.solicitudRecolectaForm.controls['direccion'].setValue(" ");
    this.solicitudRecolectaForm.controls['observacion'].setValue(" ");
  }

  CiudadxEstado(idestado:any){
    this.ciudadxEstado = [];
    for(let j = 0; j<this.ciudades.length; j++){
      if(this.ciudades[j].idestado == idestado){
        this.ciudadxEstado.push(this.ciudades[j]);
      }
    }
  }

  agregarSolicitudRecolecta(){
    if(moment(this.solicitudRecolectaForm.controls["fecha"].value, "YYYY-MM-DD").format("YYYY-MM-DD") > moment().format()){
      let solicitudrecolecta = {
        bultos: this.solicitudRecolectaForm.controls["bultos"].value,
        tipomercancia: this.solicitudRecolectaForm.controls["tipomercancia"].value,
        fecha: this.solicitudRecolectaForm.controls["fecha"].value,
        hora: moment(this.solicitudRecolectaForm.controls["hora"].value, "H:mm").format("HH:mm:ss"),
        estado: this.solicitudRecolectaForm.controls["estado"].value,
        ciudad: this.solicitudRecolectaForm.controls["ciudad"].value,
        direccion: this.solicitudRecolectaForm.controls["direccion"].value,
        observacion: this.solicitudRecolectaForm.controls["observacion"].value,
        iduser: this.iduser
      }
      console.log("Esta solicitud de recolecta? ", solicitudrecolecta);
      this.service.post(solicitudrecolecta,'solicitudrecolecta').then((result) => {
        let daata:any = result;
        if(daata.nro){
          swal("Solicitud de Recolecta Creada", `Su solicitud de recolecta #${daata.nro} ha sido creada exitosamente.`, "success");
          this.activeModal.close(solicitudrecolecta);
        }
      }, (err) => {
        swal("Error del Sistema", `Ha ocurrido un error al crear su solicitud de recolecta. Por favor, intentelo de nuevo: ${err}.`, "warning");
      })
    }else{
      swal("Fecha Incorrecta", "Ingrese una fecha mayor a la actual.", "info");
    }
  }

  saveSolicitudRecolecta(){
    let solrec = {
      bultos: this.solicitudRecolectaForm.controls["bultos"].value,
      tipomercancia: this.solicitudRecolectaForm.controls["tipomercancia"].value,
      fecha: this.solicitudRecolectaForm.controls["fecha"].value,
      hora: moment(this.solicitudRecolectaForm.controls["hora"].value, "H:mm").format("HH:mm:ss"),
      estado: this.solicitudRecolectaForm.controls["estado"].value,
      ciudad: this.solicitudRecolectaForm.controls["ciudad"].value,
      direccion: this.solicitudRecolectaForm.controls["direccion"].value,
      observacion: this.solicitudRecolectaForm.controls["observacion"].value,
      iduser: this.solicitudRecolecta[0].id
    }
    console.log(solrec)
    this.service.put(solrec,'solicitudrecolecta',this.solicitudRecolecta[0].nro).then((result) =>{
      let data:any = result;
      if(data.message == `La solicitud de recolecta ha sido modificada.`){
        swal("Solicitud de Recolecta Modificada", " ", "success");
      }
    }, (err) => {
      swal("Error del Sistema", "Ha ocurrido un error al editar la solicitud de recolecta. Por favor, intentelo de nuevo.", "warning");
    })
  }
  
  //Para el administrador
  editarSolicitud(){
    swal("¿Está seguro de editar esta solicitud de recolecta?", {
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
          //console.log("Cancelando ...")
          this.saveSolicitudRecolecta();
          this.activeModal.close(this.solicitudRecolecta);
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  llenarForm(){
    this.solicitudRecolectaForm.controls["bultos"].setValue(this.solicitudRecolecta[0].bultos),
    this.solicitudRecolectaForm.controls["tipomercancia"].setValue(this.solicitudRecolecta[0].tipomercancia),
    this.solicitudRecolectaForm.controls["fecha"].setValue(this.solicitudRecolecta[0].fecha.substr(0,10)),
    this.solicitudRecolectaForm.controls["hora"].setValue(this.solicitudRecolecta[0].hora),
    this.solicitudRecolectaForm.controls["estado"].setValue(this.solicitudRecolecta[0].estado),
    this.solicitudRecolectaForm.controls["ciudad"].setValue(this.solicitudRecolecta[0].ciudad),
    this.solicitudRecolectaForm.controls["direccion"].setValue(this.solicitudRecolecta[0].direccion),
    this.solicitudRecolectaForm.controls["observacion"].setValue(this.solicitudRecolecta[0].observacion)
    
    for(let i =0; i<this.ciudades.length; i++){
      if(this.ciudades[i].id == this.solicitudRecolecta[0].ciudad){
        this.ciudadxEstado.push(this.ciudades[i]);
      }
    }
  }

}
