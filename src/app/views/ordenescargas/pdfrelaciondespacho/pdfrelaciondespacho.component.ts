import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pdfrelaciondespacho',
  templateUrl: './pdfrelaciondespacho.component.html',
  styleUrls: ['./pdfrelaciondespacho.component.css']
})
export class PdfrelaciondespachoComponent implements OnInit {

  @Input() facturasPDF; //Lo que me trae envia el modal
  //Atributos del PDF
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

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService) { 
      this.spinner.show();
    }

  ngOnInit() {
    setTimeout(()=>{
      this.captureScreen();
    }, 1000);
    setTimeout(() => {
      this.activeModal.close();
      this.spinner.hide();
    }, 7000);
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
      pdf.save(`Usuario_RazonSocial_Relacion_Despacho_Nro_${this.facturasPDF[0].nrorelaciondespacho}.pdf`); // Generated PDF 
      return console.log("PDF?") 
    });  
  } 

}
