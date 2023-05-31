import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/services/login/login.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    private router: Router,
    private logService: LoginService,
    private afs: AngularFirestore,
    private log: LoggerService
  ) {}
  contrasenaInc: string = '';
  datosUsuario: any[] = [];
  //Variables de validacion
  email: string = '';
  contrasena: string = '';

  async Loguearse(email: string, password: string) {
    try {
      this.AnadirAlLog('Entrando a Login.ts || Metodo Loguearse');
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uuid = result.user!.uid;

      localStorage.setItem('correo', email);

      const doc = await this.afs
        .collection('Usuarios')
        .doc(uuid)
        .get()
        .toPromise();

      if (doc!.exists) {
        const campoValor = doc!.get('rol');
        localStorage.setItem('uuid', uuid);
        localStorage.setItem('rol', campoValor);
        console.log(localStorage);
      } else {
        this.AnadirAlLog('El documento no existe');
      }

      this.AnadirAlLog(
        'Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario'
      );
      this.router.navigate(['/verificado']);
    } catch (error) {
      console.log('Error al loguearse contraseña inválida');
    }
  }

  //Validaciones de los inputs

  validarEmail() {
    const pattern = /^[a-zA-Z0-9\s.@]*$/;
    return pattern.test(this.email);
  }

  validarContrasena() {
    const pattern = /^[a-zA-Z0-9\s]*$/;
    return pattern.test(this.contrasena);
  }

  //Metodo que añade al log
  AnadirAlLog(data:string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          data: data
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
