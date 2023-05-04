import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { SHA256 } from 'crypto-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public myText: string = "";

  constructor(
    private firebase: RegistroService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore) { }

  //Creamos el formulario
  formUsuario = this.fb.group({
    email: [],
    contraseña: [],
    rol: [1],
    uuid:[""]
  });

  Registrarse(email: string, password: string) {
    //Antes de nada hacemos un hash de la contraseña
    const hash = SHA256(password).toString();
    console.log("Entrando a Registro.ts || Metodo Registrarse");
    return this.afAuth
      .createUserWithEmailAndPassword(email, hash)
      .then((result) => {
        //Una vez se registra almacenamos el uuid
        const uuid = result.user!.uid;
        const verified = result.user?.emailVerified;
        //enviamos el correo de verificación
        result.user!.sendEmailVerification();
        //Actualizamos el valor del formulario
        this.formUsuario.patchValue({
          uuid: result.user!.uid
        });
        console.log("Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario");
        //Creamos el documento con el uuid del usuario registrado para que mas tarde se nos sea mas facil buscar sus datos
        this.firebase.CrearRegistrar(this.formUsuario.value,uuid)
        if (verified == true) {
          this.router.navigate(["/Menu"])
        } else {
          this.myText = "Mira tu correo y verificate para continuar,\n mira en spam por si acaso :3"
        }

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

}
