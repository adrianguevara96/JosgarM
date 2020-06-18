import { Component, OnInit, Injectable } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
@Injectable()
export class PruebaComponent implements OnInit {
  tipoU:number;
  constructor() { }

  ngOnInit(): void {
  }

  settipoU(valor){
    this.tipoU = valor;
  }
  gettipoU(){
    return this.tipoU;
  }

}
