import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  user:any;
  constructor( 
    private router: Router,
    private service: ServicesService ){ }
  
  public canActivate() {
    this.user = this.service.getUser();
    console.log(this.user);
    if(this.user){
      return true;
    }else{
      swal("Acceso Denegado", `Por favor, inicie sesión.`, "warning");
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
