import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificarEstadoCorreoGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("estado-correo") == "true") {
      console.log(localStorage.getItem("estado-correo"))
      this.router.navigate(['/Menu']);
      return true;
    } else {
      this.router.navigate(['/verificado']);
      return false;
    }
  }
}
