import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginService } from 'src/app/services/login/login.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
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
    private afs: AngularFirestore,
    private log: LoggerService
  ) { }
  loged: boolean = false;
  contrasenaInc: string = '';
  emailInc: string = '';
  datosUsuario: any[] = [];
  //Variables de validacion
  email: string = '';
  contrasena: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  async Loguearse(email: string, password: string) {
    try {
      this.AnadirAlLog('Entrando a Login.ts || Método Loguearse');
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const uuid = await result.user!.uid;
      await localStorage.setItem('correo', email);
      const doc = await this.afs
        .collection('Usuarios')
        .doc(uuid)
        .get()
        .toPromise();

      if (doc!.exists) {
        const campoValor = doc!.get('rol');
        await localStorage.setItem('uuid', uuid);
        await localStorage.setItem('rol', campoValor);
        console.log(localStorage);
      } else {
        this.AnadirAlLog('El documento no existe');
      }

      this.AnadirAlLog(
        'Entrando a Login.ts/Loguearse || Devolviendo el correo y contraseña que recibimos de nuestro formulario'
      );
      this.loged = true;
      var estado = firebase.auth().currentUser?.emailVerified;
      await localStorage.setItem('estado-correo',estado!.toString());

      this.router.navigate(['/verificado']);
    } catch (error: any) {
      this.AnadirAlLog('Error al loguearse: ' + error.message);
      if (error.code === 'auth/wrong-password') {
        this.contrasenaInc = 'Contraseña incorrecta';
      } else if (error.code === 'auth/user-not-found') {
        this.contrasenaInc = 'Usuario no encontrado';
      } else if (error.code === 'auth/invalid-email') {
        this.contrasenaInc = 'Email no válido';
      } else if (error.code === 'auth/user-disabled') {
        this.contrasenaInc = 'Usuario deshabilitado';
      } else if (error.code === 'auth/internal-error') {
        this.contrasenaInc = 'Error interno en Firebase';
      } else if (error.code === 'auth/network-request-failed') {
        this.contrasenaInc = 'Error de solicitud de red. Verifica tu conexión a Internet';
      } else if (error.code === 'auth/too-many-requests') {
        this.contrasenaInc = 'Se ha excedido el límite de solicitudes. Inténtalo de nuevo más tarde';
      } else if (error.code === 'auth/operation-not-allowed') {
        this.contrasenaInc = 'Operación no permitida en el proyecto de Firebase';
      } else {
        // Otros errores
         this.contrasenaInc = 'Error al iniciar sesión';
      }
    }
  }


  //Validaciones de los inputs

  validarEmail() {
    const pattern = /^[a-zA-Z0-9\s.]+@/;
    return pattern.test(this.email);
  }

  validarContrasena() {
    const pattern = /^[a-zA-Z0-9\s]*$/;
    return pattern.test(this.contrasena);
  }

  //Metodo que añade al log
  AnadirAlLog(data: string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
    }
  }
}
