import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../../services/services.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalusersComponent } from './modalusers/modalusers.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:any[]=[];
  estados:any;
  ciudades:any;
  tiposMercancia:any;
  tiposIdentificacion:any;
  data:any;

  constructor(
    public service: ServicesService,
    private modalService: NgbModal,) { }

  ngOnInit(){
    this.getUsuarios();
    this.getEstados();
    this.getCiudades();
    this.getTiposMercancia();
    this.getTiposIdentificacion();
  }

  openModal(accion:any, user:any) {
    const modalRef = this.modalService.open(ModalusersComponent, {size: 'xl'});
    modalRef.componentInstance.usuario = user;
    modalRef.componentInstance.accion = accion;
    modalRef.componentInstance.estados = this.estados;
    modalRef.componentInstance.ciudades = this.ciudades;
    modalRef.componentInstance.tiposmercancia = this.tiposMercancia;
    modalRef.componentInstance.tiposidentificacion = this.tiposIdentificacion;
  
    //Lo que me trae el modal al cerrarse
    modalRef.result.then((result) => {
      if(result){
        let dataa:any[] = result
        if(dataa){
          this.getUsuarios();
        }
      }
    }, (reason)=> {
    })
  }

  cancelarUsuario(user:any){
    swal("¿Está seguro de eliminar este usuario?", {
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
          this.cancelUsuario(user);
          this.getUsuarios();
          break;
        case "rechazar":
        swal.close();
        break;
      }
    });
  }

  cancelUsuario(user:any){
    this.service.delete('user', user.id).then( (result) =>{
      this.data = result;
      if(this.data.message == "El usuario ha sido eliminado."){
        swal("Usuario Eliminado", `Se ha eliminado el usuario ${user.nombres +" "+ user.apellidos} satisfactoriamente`, "success");
      }
    }, (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    })
  }

  getEstados(){
    this.service.get('estados').then((result) => {
      this.estados = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getCiudades(){
    this.service.get('ciudades').then((result) => {
      this.ciudades = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getUsuarios(){
    this.service.get('users').then((result) => {
      let data:any = result;
      this.users = [];
      this.users = data;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  };

  getTiposMercancia(){
    this.service.get('tiposmercancia').then((result) => {
      this.tiposMercancia = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  }

  getTiposIdentificacion(){
    this.service.get('tiposidentificacion').then((result) => {
      this.tiposIdentificacion = result;
    }, 
    (err) => {
      swal("Error del Sistema", `Ha ocurrido un error en el sistema: ${err}.`, "warning");
    });
  }

}
