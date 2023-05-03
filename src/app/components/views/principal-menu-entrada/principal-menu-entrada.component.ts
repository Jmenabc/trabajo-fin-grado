import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-menu-entrada',
  templateUrl: './principal-menu-entrada.component.html',
  styleUrls: ['./principal-menu-entrada.component.css'],
})
export class PrincipalMenuEntradaComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      localStorage.clear()
      console.log(localStorage)
      this.router.navigate(['/login'])
    })
  }
}
