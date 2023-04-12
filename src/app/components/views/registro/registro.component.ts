import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(
    private firebase: RegistroService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder) { }

  //Creamos el formulario
  formUsuario = this.fb.group({
    email: [],
    contraseña: [],
    rol: [1],
  });

  Registrarse(email: string, password: string) {
    //Antes de nada hacemos un hash de la contraseña
    const hash = SHA256(password).toString();
    console.log("Entrando a Registro.ts || Metodo Registrarse");
    return this.afAuth
      .createUserWithEmailAndPassword(email, hash)
      .then((result) => {
        console.log("Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario");
        this.firebase.CrearUsuario(this.formUsuario.value)
        console.log(hash)
        this.router.navigate(["/Menu"])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
