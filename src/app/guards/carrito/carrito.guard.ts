import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  Guardian que cuida que nadie que no este permitido entre en carrito
  @author Jmenabc
*/
export class CarritoGuard implements CanActivate {
   constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("rol") == "1") {
      console.log(localStorage.getItem("rol") )
      return true;
    } else if (localStorage.getItem("rol") == "3") {
      return true;
    }
    else {
      this.router.navigate(['/noPermisos']);
      return false;
    }
  }

}
