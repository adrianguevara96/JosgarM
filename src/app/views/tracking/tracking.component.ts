import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  trackingForm: FormGroup;
  placeholderInput:string = "Indique un nro a buscar";
  constructor(
    private formBuilder: FormBuilder,) { 
      this.createForm(); 
    }

  ngOnInit(): void {
  }

  createForm() {
    //this.solicitudRecolecta = [];
    this.trackingForm = this.formBuilder.group({
      buscar: [0],
      inputBuscar: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.trackingForm.valid) {
      console.log(this.trackingForm.value);
    }
    else {
      swal("Error", `Por favor, ${this.placeholderInput}.`, "error");
      console.log(this.trackingForm.value);
    }
  }

  placehold(){
    console.log("aqui estoy", this.trackingForm.controls['buscar'].value)
    setTimeout( () => {
      if(this.trackingForm.controls['buscar'].value == 1){
        this.placeholderInput = 'Indique el nro de factura a buscar';
      }else if(this.trackingForm.controls['buscar'].value == 2){
        this.placeholderInput = 'Indique el nro de guia a buscar';
      }
    },200);

  }

}
