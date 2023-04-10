import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/*
* Clase que contendra mi metodo de logueo a firebase
* @Firebase Auth
* @author Jmenabc
*/
export class LoginComponent {

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router) { }

  Loguearse(email: string, password: string) {
    console.log("Entrando a Login.ts || Metodo Loguearse");
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario");
        if (result) {
          this.router.navigate(["/registro"])
        }
      })
      .catch((error) => {
        window.alert("Se ha producido un error al intentar iniciar sesion, si el error persiste pongase en contacto con el administrador");
      });
  }


}
