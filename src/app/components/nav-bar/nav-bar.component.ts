import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}
  estado: string = '';
  rol: string = localStorage.getItem('rol')!;
  //Vamos a comprobar si el usuario esta logueado o no, en cada caso devolveremos o la letra
  //a = registrado
  //b = no registrado
  //Con esto jugaremos con el navbar y meteremos los datos del usuario en el localStorage
  async ComprobarEstadoSesion() {
    if (localStorage.getItem('correo') != null) {
      this.estado = 'a';
    } else {
      this.estado = 'b';
    }
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      console.log(localStorage);
      this.router.navigate(['/login']);
    });
  }
  ngOnInit() {
    this.ComprobarEstadoSesion();
    this.rol;
    console.log(this.rol);
  }
}
