import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';

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
    console.log("Entrando a Registro.ts || Metodo Registrarse");
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario");
        this.firebase.CrearUsuario(this.formUsuario.value)
        this.router.navigate(["/menu"])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
