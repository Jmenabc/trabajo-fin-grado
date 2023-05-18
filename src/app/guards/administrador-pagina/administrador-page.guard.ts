import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
* Guardian que comprueba que los usuario no administradores no puedan entrar
* @CanActivate
* @Author Jmenabc
*/
export class AdministradorPageGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("rol") == "2") {
      return true;
    }else if(localStorage.getItem("rol") == "3") {
      return true;
    }
    else {
      this.router.navigate(['/noPermisos']);
      return false;
    }
  }
}
