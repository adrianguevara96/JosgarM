import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';

@Component({
  selector: 'app-modalsolicitudrecolecta',
  templateUrl: './modalsolicitudrecolecta.component.html',
  styleUrls: ['./modalsolicitudrecolecta.component.css']
})
export class ModalsolicitudrecolectaComponent implements OnInit {

  @Input() solicitudReco; //Lo que me envia para el modal
  @Input() accion;

  esconderBoton:boolean = false;
  tipoAccion:any;
  numero: any;
  see:boolean = false;

  solicitudRecolectaForm: FormGroup;
  solicitudRecolecta:any[]=[];
  estado:any[]=[
    {
      id: 1,
      nombre: 'Portuguesa',
      status: 1
    },
    {
      id: 2,
      nombre: 'Lara',
      status: 1
    },
  ];
  ciudad:any[]=[
    {
      id: 1,
      nombre: 'Barquisimeto',
      idciudad: 2,
      status: 1
    },
    {
      id: 2,
      nombre: 'Carora',
      idciudad: 2,
      status: 1
    },
    {
      id: 3,
      nombre: 'Acarigua',
      idciudad: 1,
      status: 1
    }
  ];
  tipoMercancia:any[]=[
    {
      id:1,
      nombre: 'Repuestos',
      status: 1
    },
    {
      id:2,
      nombre: 'Ferreteria',
      status: 1
    },
    {
      id:3,
      nombre: 'Farmacos',
      status: 1
    },
    {
      id:4,
      nombre: 'Documentos',
      status: 1
    },
    {
      id:5,
      nombre: 'Varios',
      status: 1
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal) { 
    this.createForm();
  }

  ngOnInit(){
    if(this.accion == "see"){
      console.log("Entre aqui por la opcion SEE")
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
      this.see = true;
      //Hacer un for para ver las facturas que hayan en la relacion de despacho
      this.solicitudRecolecta = [];
      this.solicitudRecolecta = this.solicitudReco;
      this.numero = `# ${this.solicitudRecolecta[0].nro}`;
    }else{
      this.tipoAccion = "Agregar";
      this.numero = "";
      this.esconderBoton = false;
    }
  }

  createForm() {
    this.solicitudRecolecta = [];
    this.solicitudRecolectaForm = this.formBuilder.group({
      bultos: ["", Validators.required],
      tipomercancia: ["", Validators.required],
      fecha: ["", Validators.required],
      hora: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
      direccion: ["", Validators.required],
      observacion: [""]
    });
  }

  onSubmit() {
    if (this.solicitudRecolectaForm.valid) {
      console.log(this.solicitudRecolectaForm.value);
      this.solicitudRecolecta = []
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
            this.solicitudRecolecta.push(
              {
                nro: 20,
                bultos: this.solicitudRecolectaForm.value.cantbultos,
                tipoMercancia: this.solicitudRecolectaForm.value.tipoMercancia,
                fecha: this.solicitudRecolectaForm.value.fecha,
                hora: this.solicitudRecolectaForm.value.hora,
                estado: this.solicitudRecolectaForm.value.estado,
                ciudad: this.solicitudRecolectaForm.value.ciudad,
                direccion: this.solicitudRecolectaForm.value.direccion,
                observacion: this.solicitudRecolectaForm.value.observacion,
                estatus: 'Pendiente',
              })
              this.activeModal.close(this.solicitudRecolecta)
            break;
          case "cancel":
          swal.close();
          break;
        }
      });
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }

  limpiar(){
    this.solicitudRecolectaForm.controls['cantbultos'].setValue("");
    this.solicitudRecolectaForm.controls['tipoMercancia'].setValue("");
    this.solicitudRecolectaForm.controls['fecha'].setValue("");
    this.solicitudRecolectaForm.controls['hora'].setValue("");
    this.solicitudRecolectaForm.controls['direccion'].setValue("");
    this.solicitudRecolectaForm.controls['observacion'].setValue("");
  }

}
