import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "https://apijosgarm.herokuapp.com/api/";
  user: any;
  business: any = {
    nombre: 'Inversiones & Servicios Josgar M C.A'
  };

  constructor(public http: HttpClient) { }

  //GET
  get(entidad:string){
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       //Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise(resolve => {
      this.http.get(this.url + entidad, { headers: head }).subscribe( (data) => {
        console.log("Que me trae data en GET", data);
        resolve(data);
      }, (err) => {
        console.log(`Ha ocurrido un error al realizar el get en ${entidad}`, err);
      });
    });
  }

  //POST
  post(datos, entidad:string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + entidad, datos)
        .subscribe(res => {
          console.log("Que me trae res en POST", res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //PUT
  put(datos, entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       //Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.put(this.url + entidad + '/' + valor, (datos))
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //DELETE
  delete(entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       //Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      console.log(this.url + entidad + '/'+ valor);
      this.http.delete(this.url + entidad + '/' + valor)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  //PUT PARA ELIMINACION LOGICA
  putLogic(entidad: string, valor) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
       //Authorization: 'Bearer: ' + this.getUserToken()
    })
    return new Promise((resolve, reject) => {
      this.http.put(this.url + entidad + '/' + valor, null)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }



  /*  === VARIABLES A USAR EN TODO EL SISTEMA ===  */
  //Setear todos los datos del usuario
  setUser(id,tipousuario,nombres,apellidos, tlffijo,tlfmovil,tipoidentificacion,rif,email,razonsocial,dirfiscal,estado,ciudad,tipomercancia,status,password,token) {
    this.user = {
      id: id,
      tipousuario: tipousuario,
      nombres: nombres,
      apellidos: apellidos,
      tlfijo: tlffijo,
      tlfmovil: tlfmovil,
      tipoidentificacion: tipoidentificacion,
      rif: rif,
      email: email,
      razonsocial: razonsocial,
      dirfiscal: dirfiscal,
      estado: estado,
      ciudad: ciudad,
      tipomercancia: tipomercancia,
      status: status,
      password: password,
      token: token
    };
  }
  setBusiness(nombre){
    this.business = {
      nombre: nombre
    }
  }
  getBusiness(){
    return this.business;
  }
  //Obtener todo el usuario
  getUser(){
    return this.user;
  }
  //Obtener un dato especifico del usuario
  getUserToken(){
    return this.user.token;
  }
  getIDUser(){
    return this.user.id;
  }

  /*  === INICIAR SESION ===  */
  //Method for user login
  logIn(email, pass) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url +'auth', { email: email, password: pass})
        .subscribe(res => {
          //let datos = JSON.parse(JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
