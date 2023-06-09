import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SHA256 } from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RegistroService } from 'src/app/services/registro/registro.service';
import { Location } from '@angular/common';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
/*
  Clase que contiene los metodos de creacion de usuarios
  @author
*/
export class CrearUsuariosComponent {
  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private firebase: UsuarioService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private rService: RegistroService,
    private RegistroService: RegistroService,
    private _location: Location,
    private log: LoggerService,
    private reg: RegistroService,
  ) { }
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Usuarios';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  rellenar: string = "";
  //Variables de validacion
  email: string = '';
  contrasena: string = '';
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  //Declaramos nuestro formulario para enviar los datos del juguete
  formUsuarios = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    uuid: '',
    rol: [2],
  });

  //Metodo ir para la ventana de atras
  irAtras() {
    this._location.back();
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
      this.router.navigate(['/errorBBDD']);
    }
  }
  //metodo que nos registra
  Registrarse(correo: string, password: string) {
    try {
      //Antes de nada hacemos un hash de la contraseña
      this.AnadirAlLog('Entrando a Registro.ts || Metodo Registrarse');
      return this.afAuth
        .createUserWithEmailAndPassword(correo, password)
        .then((result) => {
          //Una vez se registra almacenamos el uuid
          const uuid = result.user!.uid;
          //enviamos el correo de verificación
          result.user!.sendEmailVerification();

          // localStorage.setItem('correo', correo);
          // localStorage.setItem("uuid", uuid)
          this.AnadirAlLog(
            'Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario'
          );
          if (this.formUsuarios.valid) {
            this.reg.CrearRegistrar(this.formUsuarios.value, uuid);
            //Actualizamos el valor del formulario
            this.formUsuarios.patchValue({
              uuid: result.user!.uid,
            });
            this._location.back();
            this.AnadirAlLog("Usuario Creado");
          }
        })
        .catch((error) => {
          this.AnadirAlLog(error.message);
          this.rellenar = "Rellene todos los campos";
          if (error.code === 'auth/email-already-in-use') {
            this.AnadirAlLog('El correo electrónico ya está registrado.');
            this.rellenar = "Correo en uso";
          }
        });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      return this.router.navigate(['/errorBBDD']);
    }
  }
  //Validaciones de los inputs

  validarEmail() {
    const pattern = /^[a-zA-Z0-9\s.]+@gmail\.com$/;
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
