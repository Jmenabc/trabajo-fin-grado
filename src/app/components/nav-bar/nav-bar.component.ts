import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private afAuth: AngularFireAuth) {}
  estado: string = '';
  rol: string = localStorage.getItem('rol')!;
  //Vamos a comprobar si el usuario esta logueado o no, en cada caso devolveremos o la letra
  //a = registrado
  //b = no registrado
  //Con esto jugaremos con el navbar y meteremos los datos del usuario en el localStorage
   ComprobarEstadoSesion() {
    console.log(localStorage.getItem('email'));
    if (
      localStorage.getItem('correo') != null
    ) {
      this.estado = 'a';
    } else {
      this.estado = 'b';
    }
  }
  ngOnInit() {
    this.ComprobarEstadoSesion();
    this.rol;
    console.log(this.rol);
  }
}
