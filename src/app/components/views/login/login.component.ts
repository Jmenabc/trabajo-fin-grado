import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SHA256 } from 'crypto-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/services/login/login.service';

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
    private afs: AngularFirestore
  ) {}
  contrasenaInc: string = '';
  datosUsuario: any[] = [];

  async Loguearse(email: string, password: string) {
    try {
      const hash = SHA256(password).toString();
      console.log('Entrando a Login.ts || Metodo Loguearse');
      const result = await this.afAuth.signInWithEmailAndPassword(email, hash);
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
        console.log('El documento no existe');
      }

      console.log(
        'Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario'
      );
      console.log(hash);
      this.router.navigate(['/verificado']);
    } catch (error) {
      console.log('Error al loguearse contraseña inválida');
    }
  }
}
