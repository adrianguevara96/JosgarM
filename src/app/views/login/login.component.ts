import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('user') userElement: ElementRef;

  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 
  loginForm: FormGroup;
  
  emailforpassforgot:string;
  
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      if(this.loginForm.controls["email"].value == "admin@admin.com" && this.loginForm.controls["password"].value == "admin"){
        this.router.navigate(['/dashboard']);
      }else{
        alert("Credenciales Incorrectas.");
      }
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }
  validate(){
    if(this.loginForm.controls["email"].value == "admin" && this.loginForm.controls["password"].value == "admin"){
      this.router.navigate(['/dashboard']);
    }else{
      alert("Credenciales Incorrectas.");
    }
  }
}
