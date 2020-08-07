import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from '../../../../services/services.service';
import swal from 'sweetalert';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import * as moment from 'moment';

@Component({
  selector: 'app-pdfguiascargas',
  templateUrl: './pdfguiascargas.component.html',
  styleUrls: ['./pdfguiascargas.component.css']
})
export class PdfguiascargasComponent implements OnInit {

  @Input() guiacarga;
  @Input() ciudades;
  @Input() totalBultos;
  @Input() totalBsS;
  @Input() nroguiacarga;
  @Input() gc;

  guiacargaPDFForm: FormGroup;
  esconderInputyBoton: boolean;
  fecha:any;
  accion = "" ;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    public service: ServicesService
  ) {

   }

  ngOnInit(){
    console.log(this.guiacarga, this.ciudades, this.nroguiacarga);
    this.createForm(); 
    this.fecha = moment().format('DD/MM/YYYY');
    if(this.gc != undefined){
      this.guiacargaPDFForm.controls['nombre'].setValue(this.gc.nombre);
      this.guiacargaPDFForm.controls['cedula'].setValue(this.gc.cedula);
      this.accion = this.gc.accion;
      console.log(this.accion)
    }
  }

  createForm() {
    //this.solicitudRecolecta = [];
    this.guiacargaPDFForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      cedula: ["", Validators.required],
      vehiculo: ["", Validators.required],
      marca: ["", Validators.required],
      placa: ["", Validators.required],
      telefono: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.guiacargaPDFForm.valid) {
      //console.log(this.relacionDespachoPDFForm.value);
      swal("¿Está seguro de generar este PDF? En caso de equivocarse, debe generarlo nuevamente.", {
        icon: "warning",
        closeOnClickOutside: false,
        buttons: {
          cancel: "Cancelar",
          si: true
        },
      } as any)
      .then((value) => {
        switch (value) {
          case "si":
            this.esconderInputyBoton = true;
            this.guardarNombreCedulaChofer();
            setTimeout(()=>{
              this.captureScreen();
              this.spinner.show();
            }, 500);
            setTimeout(() => {
              this.spinner.hide();
              this.activeModal.close(this.guiacarga);
            }, 12000);
            break;
          case "cancel":
          swal.close();
          break;
        }
      });
    }
    else {
      swal("Error", "Por favor, rellene todos los campos.", "error");
    }
  }

  public captureScreen(){  
    //this.ocultarBoton = true;
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 210;   
      var pageHeight = 295;    
      var imgHeight= canvas.height * imgWidth / canvas.width;  
      console.log("Canvas ",canvas.height);
      console.log("imgWidth: ", imgWidth)
      console.log("imgHeight: ", imgHeight)
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`GuiadeCarga-Chofer:${this.guiacargaPDFForm.controls['nombre'].value}.pdf`); // Generated PDF 
      return console.log("PDF?") 
    });  
  } 

  guardarNombreCedulaChofer(){
    let guiacarga = {
      chofer: this.guiacargaPDFForm.controls['nombre'].value,
      cedula: this.guiacargaPDFForm.controls['cedula'].value,
      montoliquidacion: this.gc.montoliquidacion
    }
    this.service.put(guiacarga,'guiacarga/chofer',this.nroguiacarga).then((result) =>{
      let data:any = result;
      if(data.message == "El chofer y su cedula han sido agregados a la guia de carga correctamente."){
        console.log("Se ha agregado el chofer y cedula");
      }else{
        console.log("Maldito maduro");
      }
    }, (err) => {
      console.log("Error al guardar chofer y cedula en la guia de carga ", err);
    })
  }

}
