import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { SHA256 } from 'crypto-js';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  public myText: string = '';
  //Variables de validacion
  email: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  constructor(
    private firebase: RegistroService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {}

  //Creamos el formulario
  formUsuario = this.fb.group({
    email: '',
    rol: [1],
    uuid: [''],
    nombre: '',
    apellidos: '',
    telefono: '',
  });

  async Registrarse(email: string, password: string) {
    console.log('Entrando a Registro.ts || Metodo Registrarse');
    return await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        //Una vez se registra almacenamos el uuid
        const uuid = result.user!.uid;
        //enviamos el correo de verificación
        result.user!.sendEmailVerification();
        //Actualizamos el valor del formulario
        this.formUsuario.patchValue({
          uuid: result.user!.uid,
        });
        localStorage.setItem('correo', email);
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
          console.log('El documento no existe');
        }
        console.log(
          'Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario'
        );
        //y le redirigimos a la ventana del menu
        this.router.navigate(['/verificado']);
      })
      .catch((error) => {
        console.log('Error en la base de datos');
        this.myText = "Rellena todos los valores"
      });
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

  validarNombre() {
    const pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(this.nombre);
  }

  validarApellidos() {
    const pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(this.apellidos);
  }

  validarTelefono() {
    const pattern = /^[0-9]*$/;
    return pattern.test(this.telefono);
  }
}
