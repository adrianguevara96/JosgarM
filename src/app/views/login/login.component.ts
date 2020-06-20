import { Component, ViewChild, ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultLayoutComponent } from '../../containers';
import { PruebaComponent } from '../prueba/prueba.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

@Injectable()
export class LoginComponent {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('user') userElement: ElementRef;

  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 
  loginForm: FormGroup;
  passwordforgotForm: FormGroup;

  emailforpassforgot:string;
  
  public tipoUser:number = 1;
  texto:number;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public def: DefaultLayoutComponent,
    public pru: PruebaComponent
  ){
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
    this.passwordforgotForm = this.formBuilder.group({
      emailforpassforgot: ["", Validators.required]
    })
  }
  //Para Iniciar Sesion
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      if(this.loginForm.controls["email"].value == "admin@admin.com" && this.loginForm.controls["password"].value == "admin"){
        this.pru.settipoU(3);
        this.def.setnavItems(3);
        this.router.navigate(['/dashboard']);
      }else if(this.loginForm.controls["email"].value == "operator@operator.com" && this.loginForm.controls["password"].value == "operator"){
        this.pru.settipoU(2);
        this.def.setnavItems(2);
        this.router.navigate(['/dashboard']);
      }else if(this.loginForm.controls["email"].value == "user@user.com" && this.loginForm.controls["password"].value == "user"){
        this.pru.settipoU(1);
        this.def.setnavItems(1);
        this.router.navigate(['/dashboard']);
      }else{
        alert("Credenciales Incorrectas.");
      }
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }

  onSubmitpassword(){
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }else{
      alert("FILL FIELD");
    }
  }

  prueba(){
    console.log("Estoy clickeando prueba");
    this.pru.settipoU(50000);
    console.log("Que me trae prueba?" , this.pru.gettipoU())
    this.texto = this.pru.gettipoU();
    console.log("Texto? : " ,this.texto)
  }
}