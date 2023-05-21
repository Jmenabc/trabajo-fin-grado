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

  datosUsuario: any[] = [];

  Loguearse(email: string, password: string) {
    //Antes de nada hacemos un hash de la contraseña
    const hash = SHA256(password).toString();
    console.log('Entrando a Login.ts || Metodo Loguearse');
    return this.afAuth
      .signInWithEmailAndPassword(email, hash)
      .then((result) => {
        //Una vez nos hemos logueado guardamos en el localStorage nuestro correo para poder usarlo y tenerlo guardado
        localStorage.setItem('correo', email);
        //Una vez guardado el correo nos disponemos a ejecutar una query para buscar el rol del usuario para guardarlo en
        //el localStorage
        //Una vez se loguea recogemos el uuid
        const uuid = result.user!.uid;
        //Recorremos el documento y le extraemos el rol
        this.afs
          .collection('Usuarios')
          .doc(uuid)
          .get()
          .subscribe((doc) => {
            if (doc.exists) {
              const campoValor = doc.get('rol');
              localStorage.setItem('uuid', uuid);
              localStorage.setItem('rol', campoValor);
              console.log(localStorage);
            } else {
              console.log('El documento no existe');
            }
          });

        //mostramos por consola el objeto
        console.log(
          'Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario'
        );
        if (result) {
          console.log(hash);
          this.router.navigate(['/verificado']);
        }
      })
      .catch((error) => {
        console.log('Error en la base de datos');
        return this.router.navigate(['/errorBBDD']);
      });
  }
}
