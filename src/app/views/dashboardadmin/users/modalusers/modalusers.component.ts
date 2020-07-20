import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ServicesService } from '../../../../services/services.service';
import swal from 'sweetalert';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modalusers',
  templateUrl: './modalusers.component.html',
  styleUrls: ['./modalusers.component.css']
})
export class ModalusersComponent implements OnInit {

  @Input() usuario;
  @Input() accion;
  @Input() estados; 
  @Input() ciudades;
  @Input() tiposmercancia;
  @Input() tiposidentificacion;

  data:any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; //Validador de email
  userForm: FormGroup;
  business:any;
  ciudadxEstado:any[]=[];
  tipoAccion:any;
  esconderBoton:boolean = false;
  passwordforUser = "";
  tiposUsuario:any[]=[
    {
      id: 1,
      nombre: 'Cliente'
    },
    {
      id: 2,
      nombre: 'Operador'
    },
    {
      id: 3,
      nombre: 'Administrador'
    }
  ];


  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService,
    public activeModal: NgbActiveModal) {
      this.createForm();
      this.business = this.service.getBusiness();
    }

  ngOnInit() {
    if(this.accion == "see"){
      this.tipoAccion = "Ver"; //Lo que se muestra en el titulo del card en HTML
      this.esconderBoton = true; //Esconde los botones de agregar, eliminar fila, guardar y limpiar
    }else if(this.accion == "edit"){
      this.tipoAccion = "Modificar";
      this.esconderBoton = true;
      this.llenarUsuarioalEditar();
    }else{
      this.tipoAccion = "Crear";
      this.esconderBoton = false;
    }
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", Validators.required],
      razonsocial: [""],
      password: ["", Validators.required],
      tipousuario: [0, Validators.required],

      tlfijo: [""],
      tlfmovil: [""],
      tipoidentificacion: [0],
      rif: [""],
      dirfiscal: [""],
      tipomercancia: [0],
      estado: [0],
      ciudad: [0]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      if(this.accion == 'edit'){

      }else{
        this.registerUser();
      }
    }else {
      swal("Rellenar Campos", "Por favor, rellene todos los campos.", "info");
      console.log(this.userForm.value)
    }
  }

  CiudadxEstado(idestado:any){
    this.ciudadxEstado = [];
    for(let i = 0; i<this.ciudades.length; i++){
      if(this.ciudades[i].idestado == idestado){
        this.ciudadxEstado.push(this.ciudades[i]);
      }
    }
  }

  RazonSocial(id:any){
    if(id != 1){
      this.userForm.controls['razonsocial'].setValue(this.business.nombre);
    }else{
      this.userForm.controls['razonsocial'].setValue("");
    }
  }

  modifyUser(){
    console.log(this.userForm.value)
    if(this.userForm.controls['password'].value != this.usuario.password){
      console.log(this.userForm.controls['password'].value)
      console.log(this.usuario.password)
      this.passwordforUser = this.userForm.controls['password'].value;

      let user1 = {
        nombres: this.userForm.controls['nombres'].value,
        apellidos: this.userForm.controls['apellidos'].value,
        tlfijo: this.userForm.controls['tlfijo'].value,
        tlfmovil: this.userForm.controls['tlfmovil'].value,
        tipoidentificacion: this.userForm.controls['tipoidentificacion'].value,
        rif: this.userForm.controls['rif'].value,
        razonsocial: this.userForm.controls['razonsocial'].value,
        dirfiscal: this.userForm.controls['dirfiscal'].value,
        estado: this.userForm.controls['estado'].value,
        ciudad: this.userForm.controls['ciudad'].value,
        tipomercancia: this.userForm.controls['tipomercancia'].value,
        email: this.userForm.controls['email'].value,
        tipousuario: this.userForm.controls['tipousuario'].value,
        password: this.passwordforUser,
      }

      console.log("Que trae user1 (user/complete)- API: ", user1)
      this.service.put(user1, 'user/complete', this.usuario.id).then((result) => {
        this.data = result
        if(this.data.message == "Usuario actualizado correctamente."){
          swal("Usuario Editado", "El Usuario ha sido editado correctamente.", "success");
          this.activeModal.close(this.usuario);
        }
      },
      (err) => {
        console.log("Error al editar el usuario ", err)
      })
    }else if (this.userForm.controls['password'].value == this.usuario.password){
      let user2 = {
        nombres: this.userForm.controls['nombres'].value,
        apellidos: this.userForm.controls['apellidos'].value,
        email: this.userForm.controls['email'].value,
        razonsocial: this.userForm.controls['razonsocial'].value,
        tipousuario: this.userForm.controls['tipousuario'].value,
        tlfijo: this.userForm.controls['tlfijo'].value,
        tlfmovil: this.userForm.controls['tlfmovil'].value,
        tipoidentificacion: this.userForm.controls['tipoidentificacion'].value,
        rif: this.userForm.controls['rif'].value,
        dirfiscal: this.userForm.controls['dirfiscal'].value,
        estado: this.userForm.controls['estado'].value,
        ciudad: this.userForm.controls['ciudad'].value,
        tipomercancia: this.userForm.controls['tipomercancia'].value,
      }
      console.log("Que trae user2 (user/completewp)- API: ", user2)
      this.service.put(user2, 'user/completewp', this.usuario.id).then((result) => {
        this.data = result
        if(this.data.message == "Usuario actualizado correctamente."){
          swal("Usuario Editado", "El Usuario ha sido editado correctamente.", "success");
          this.activeModal.close(this.usuario);
        }
      },
      (err) => {
        console.log("Error al editar el usuario ", err)
      })
    }

  }

  registerUser(){
    let user = {
      nombres: this.userForm.controls['nombres'].value,
      apellidos: this.userForm.controls['apellidos'].value,
      email: this.userForm.controls['email'].value,
      razonsocial: this.userForm.controls['razonsocial'].value,
      tipousuario: this.userForm.controls['tipousuario'].value,
      password: this.userForm.controls['password'].value
    }
    this.service.post(user,'user').then((result) => {
      this.data = result;
      if(this.data.message == `Usuario ${user.email} creado exitosamente.`){
        swal({
          title: "Usuario Registrado",
          text: `Se ha creado el usuario correctamente.`,
          icon: 'success',
          closeOnClickOutside: false,
          buttons: {
            ok: true
          }
        } as any).then( (value) => {
          switch(value){
            case "ok": 
            this.activeModal.close(user);
            break;
          }
        })
      }
    },
    (err) => {
      console.log("Error al registrar el usuario.", err)
    })
  }

  llenarUsuarioalEditar(){
    this.userForm.controls['nombres'].setValue(this.usuario.nombres);
    this.userForm.controls['apellidos'].setValue(this.usuario.apellidos);
    this.userForm.controls['tipousuario'].setValue(this.usuario.tipousuario);
    this.userForm.controls['razonsocial'].setValue(this.usuario.razonsocial);
    this.userForm.controls['email'].setValue(this.usuario.email);
    this.userForm.controls['password'].setValue(this.usuario.password);
    this.userForm.controls['tlfijo'].setValue(this.usuario.tlfijo);
    this.userForm.controls['tlfmovil'].setValue(this.usuario.tlfmovil);
    this.userForm.controls['tipoidentificacion'].setValue(this.usuario.tipoidentificacion);
    this.userForm.controls['rif'].setValue(this.usuario.rif);
    this.userForm.controls['dirfiscal'].setValue(this.usuario.dirfiscal);
    this.userForm.controls['tipomercancia'].setValue(this.usuario.tipomercancia);
    this.userForm.controls['estado'].setValue(this.usuario.estado);
    this.userForm.controls['ciudad'].setValue(this.usuario.ciudad);
    
    for(let i=0; i<this.ciudades.length;i++){
      if(this.ciudades[i].id == this.usuario.ciudad){
        this.ciudadxEstado.push(this.ciudades[i]);
      }
    }
  }

}
