import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';

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
    //Antes de nada hacemos un hash de la contraseña
    const hash = SHA256(password).toString();
    console.log("Entrando a Login.ts || Metodo Loguearse");
    return this.afAuth
      .signInWithEmailAndPassword(email, hash)
      .then((result) => {
        console.log("Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario");
        if (result) {
          console.log(hash)
          this.router.navigate(["/Menu"])
        }
      })
      .catch((error) => {
        window.alert("Se ha producido un error al intentar iniciar sesion, si el error persiste pongase en contacto con el administrador");
      });
  }


}
