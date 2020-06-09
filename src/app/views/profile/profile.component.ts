import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
