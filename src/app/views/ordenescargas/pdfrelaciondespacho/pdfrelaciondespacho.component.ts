import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-pdfrelaciondespacho',
  templateUrl: './pdfrelaciondespacho.component.html',
  styleUrls: ['./pdfrelaciondespacho.component.css']
})
export class PdfrelaciondespachoComponent implements OnInit {

  @Input() facturasPDF; //Lo que me trae envia el modal
  @Input() estados;
  @Input() ciudades;
  @Input() tiposidentificacion;
  @Input() reldespacho;

  //Para mostrar en el PDF
  remitente: '';
  rif: '';
  direccion: '';
  nombreChofer: '';
  cedulaChofer: '';
  modeloVehiculo: '';
  placaVehiculo: '';
  tipoVehiculo: '';
  colorVehiculo:'';

  loading:boolean = true;
  relacionDespachoPDFForm: FormGroup;
  esconderInputyBoton: boolean;
  user:any={};
  tipoidentificacionusuario:any;

  


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    public service: ServicesService) {
      this.esconderInputyBoton = false;
      //this.spinner.show();
      //this.user = this.service.getUser();
    }

  ngOnInit() {
    this.user = this.service.getUser();
    console.log("FACTURASPDF? ", this.facturasPDF);
    this.createForm(); 
    this.rellenarPDF();
  }

  tipoIdentificacionUsuario(tipoidentificacionusuario:any){
    for(let i =0; i<this.tiposidentificacion.length; i++){
      if(this.tiposidentificacion[i].id == tipoidentificacionusuario){
        this.tipoidentificacionusuario = this.tiposidentificacion[i].nombre;
      }
    }
  }

  createForm() {
    //this.solicitudRecolecta = [];
    this.relacionDespachoPDFForm = this.formBuilder.group({
      remitente: ["", Validators.required],
      rifremitente: ["", Validators.required],
      direccion: ["", Validators.required],
      nombreCompletoChofer: ["", Validators.required],
      cedChofer: ["", Validators.required],
      modeloCamionChofer: ["", Validators.required],
      placaCamionChofer: ["", Validators.required],
      tipoCamionChofer: ["", Validators.required],
      colorCamionChofer: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.relacionDespachoPDFForm.valid) {
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
            setTimeout(()=>{
              this.captureScreen();
              this.spinner.show();
            }, 1000);
            setTimeout(() => {
              this.spinner.hide();
              this.activeModal.close(this.facturasPDF);
            }, 10000);
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

  rellenarPDF(){
    if(this.reldespacho != undefined){
      this.tipoIdentificacionUsuario(this.reldespacho.tipoidentificacion);
      this.relacionDespachoPDFForm.controls['remitente'].setValue(this.reldespacho.razonsocial);
      this.relacionDespachoPDFForm.controls['rifremitente'].setValue(this.tipoidentificacionusuario+"-"+this.reldespacho.rif);
      this.relacionDespachoPDFForm.controls['direccion'].setValue(this.reldespacho.dirfiscal);
    }else{
      this.tipoIdentificacionUsuario(this.user.tipoidentificacion);
      this.relacionDespachoPDFForm.controls['remitente'].setValue(this.user.razonsocial);
      this.relacionDespachoPDFForm.controls['rifremitente'].setValue(this.tipoidentificacionusuario+"-"+this.user.rif);
      this.relacionDespachoPDFForm.controls['direccion'].setValue(this.user.dirfiscal);
    }
  }

  public captureScreen(){  
    //this.ocultarBoton = true;
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 210;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      console.log("Canvas ",canvas.height);
      console.log("imgWidth: ", imgWidth)
      console.log("imgHeight: ", imgHeight)
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(`${this.user.nombres+" "+this.user.apellidos}_${this.user.razonsocial}_Relacion_Despacho_Nro_${this.facturasPDF[0].nrorelaciondespacho}.pdf`); // Generated PDF 
      return console.log("PDF?") 
    });  
  } 

}
