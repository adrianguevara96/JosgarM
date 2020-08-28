import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any; //Datos del Usuario
  data:any; //Cualquier tipo de dato que reciba de alguna solicitud de los servicios
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; //Validador de email

  profileForm: FormGroup;

  id:any;
  estados:any;
  ciudades:any;
  ciudadxEstado:any[] = [];
  tiposMercancia:any;

  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService) {
    this.user = this.service.getUser();
   }

  ngOnInit(){
    this.getEstados();
    this.getCiudades();
    this.getTiposMercancia();
    this.getTiposIdentificacion();
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      nombres: [this.user.nombres, Validators.required],
      apellidos: [this.user.apellidos, Validators.required],
      email: [this.user.email, Validators.required],
      tlfijo: [this.user.tlfijo, Validators.required],
      tlfmovil: [this.user.tlfmovil, Validators.required],
      tipoidentificacion: [this.user.tipoidentificacion, Validators.required],
      rif: [this.user.rif, Validators.required],
      razonsocial: [this.user.razonsocial, Validators.required],
      tipomercancia: [this.user.tipomercancia, Validators.required],
      dirfiscal: [this.user.dirfiscal, Validators.required],
      estado: [this.user.estado, Validators.required],
      ciudad: [this.user.ciudad, Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.modifyUser();
    }else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
    }
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      console.log("Error al hacer get a estados ", err)
    });
  }

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
      for(let i= 0; i<this.ciudades.length; i++){
        if(this.ciudades[i].idestado == this.user.estado){
          this.ciudadxEstado.push(this.ciudades[i]);
        }
      }
    }, 
    (err) => {
      console.log("Error al hacer get a ciudades ", err)
    });
  }

  CiudadxEstado(idestado:any){
    this.ciudadxEstado = [];
    for(let i = 0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idestado){
        this.ciudadxEstado.push(this.ciudades[i]);
      }
    }
  }

  getTiposMercancia(){
    this.service.get('tiposmercancia').then((result) => {
      this.tiposMercancia = result;
    }, 
    (err) => {
      console.log("Error al hacer get a tiposMercancia ", err)
    });
  }

  getTiposIdentificacion(){
    this.service.get('tiposidentificacion').then((result) => {
      this.id = result;
    }, 
    (err) => {
      console.log("Error al hacer get a tiposMercancia ", err)
    });
  }
  
  modifyUser(){
    this.service.put(this.profileForm.value, 'user', this.user.id).then( (result) => {
      this.data = result
      if(this.data.message){
        swal("Perfil Actualizado", "Su perfil ha sido actualizado correctamente.", "success");
      }
    }, (err) => {
      swal("Error", "Error al editar su perfil.", "warning");
    })
  }
}
