import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Validador de email
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"; 

  profileForm: FormGroup;

  codigoAreafijo:any[] = [
    {
      id: 1,
      codigo: '248'
    },
    {
      id: 2,
      codigo: '281'
    },
  ]
  codigoAreamovil:any[] = [
    {
      id: 1,
      codigo: '412'
    },
    {
      id: 2,
      codigo: '414'
    }
  ]
  id:any[]= [
    {
      id: 1,
      valor: 'V'
    },
    {
      id: 2,
      valor: 'J'
    },
    {
      id: 3,
      valor: 'E'
    },
    {
      id: 4,
      valor: 'G'
    }
  ]
  estado:any[]= [

  ]
  ciudad:any[]= [

  ]
  tipoMercancia:any[]=[
    {
      id: 1,
      nombre: 'Documentos'
    },
    {
      id: 2,
      nombre: 'Sólidos'
    },
    {
      id: 3,
      nombre: 'Líquidos'
    },
    {
      id: 4,
      nombre: 'Varios'
    }
  ]

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      nombres: ["", Validators.required],
      apellidos: ["", Validators.required],
      email: ["", Validators.required],
      codigoareatlfijo: ["", Validators.required],
      tlfijo: ["", Validators.required],
      codigoareatlmovil: ["", Validators.required],
      tlfmovil: ["", Validators.required],
      identificacion: ["", Validators.required],
      rif: ["", Validators.required],
      razonsocial: ["", Validators.required],
      mercancia: ["", Validators.required],
      dirfiscal: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
    else {
      alert("FILL ALL FIELDS");
    }
  }

}
