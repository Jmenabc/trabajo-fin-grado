import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { SHA256 } from 'crypto-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
/*
  Clase de registro en la aplicación
  @author Jmenabc
*/
export class RegistroComponent {
  public myText: string = '';
  //Variables de validacion
  correo: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  constructor(
    private firebase: RegistroService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private log: LoggerService
  ) { }



  //Creamos el formulario
  formUsuario = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    apellidos: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    correo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s.]+@/)]],
    telefono: ['',[ Validators.required, Validators.pattern(/^[0-9]*$/)]],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    uuid: '',
    rol: [1],
  });

  async Registrarse(correo: string, password: string) {
    this.AnadirAlLog('Entrando a Registro.ts || Metodo Registrarse');
    if (this.formUsuario.invalid) {
      this.myText = "Revise las alertas del formulario"
   }
    return await this.afAuth
      .createUserWithEmailAndPassword(correo, password)
      .then(async (result) => {
        //Una vez se registra almacenamos el uuid
        const uuid = result.user!.uid;
        //enviamos el correo de verificación
        result.user!.sendEmailVerification();
        //Actualizamos el valor del formulario
        this.formUsuario.patchValue({
          uuid: result.user!.uid,
        });
        localStorage.setItem('correo', correo);
        //Una vez se crea el usuario creamos el carrito
        this.firebase.CrearCarrito(uuid);
        //Creamos el documento con el uuid del usuario registrado para que mas tarde se nos sea mas facil buscar sus datos
        this.firebase.CrearRegistrar(this.formUsuario.value, uuid);

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
          'Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario'
        );
        //y le redirigimos a la ventana del menu
        this.router.navigate(['/Menu']);
      })
      .catch((error) => {
        this.AnadirAlLog('Error en la base de datos');
        this.myText = "Revisa los campos e indicaciones"
        if (error.code === 'auth/email-already-in-use') {
          this.AnadirAlLog('El correo electrónico ya está registrado.');
        }
      });
  }

  //Validaciones de los inputs

  get email() {
    return this.formUsuario.get('correo');
  }

  get Contrasena() {
    return this.formUsuario.get('contrasena');
  }

  get Nombre() {
    return this.formUsuario.get('nombre');
  }

  get Apellidos() {
    return this.formUsuario.get('apellidos');
  }

  get Telefono() {
    return this.formUsuario.get('telefono');
  }

  AnadirAlLog(data: string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
