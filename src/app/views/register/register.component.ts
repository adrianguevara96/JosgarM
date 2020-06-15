import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  user:any[] = [
    {
      razonsocial: "",
      email: "",
      password: "",
      repassword: ""
    }
  ]
  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 
  
  angForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    console.log("registeer")
   }

  ngOnInit(){}

  createForm() {
    this.angForm = this.formBuilder.group({
      razonsocial: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      repassword: ["", Validators.required]
    });
    
    /*this.angForm.controls["razonsocial"].valueChanges.subscribe(data => {
      console.log(data);
      console.log("pass", this.angForm.controls["password"].value);
      console.log("repass", this.angForm.controls["repassword"]);
      console.log("Errores de email: ", this.angForm.controls['email'].errors.pattern)
    });*/
  }
  
  onSubmit() {
    if (this.angForm.valid) {
      console.log(this.angForm.value);
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }
  
}
