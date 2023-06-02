import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
export class CrearUsuariosComponent {
  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private firebase: UsuarioService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private RegistroService: RegistroService,
    private _location: Location,
    private log: LoggerService
  ) { }
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Usuarios';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  //Declaramos nuestro formulario para enviar los datos del juguete
  formUsuarios = this.fb.group({
    nombre: [],
    apellidos: [],
    correo: [],
    telefono: [],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    uuid: '',
    rol: [2],
    url: [],
  });

  //Metodo que añade al log
  AnadirAlLog(data:string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato:`[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  Registrarse(correo: string, password: string) {
    try {
      //Antes de nada hacemos un hash de la contraseña
      const hash = SHA256(password).toString();
      console.log('Entrando a Registro.ts || Metodo Registrarse');
      return this.afAuth
        .createUserWithEmailAndPassword(correo, password)
        .then((result) => {
          //Una vez se registra almacenamos el uuid
          const uuid = result.user!.uid;
          localStorage.setItem("uuid", uuid)
          //enviamos el correo de verificación
          result.user!.sendEmailVerification();
          //Actualizamos el valor del formulario
          this.formUsuarios.patchValue({
            uuid: result.user!.uid,
          });
          console.log(
            'Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario'
          );
          this.firebase.Crear(this.coleccion, this.formUsuarios.value);
          this._location.back();
        })
        .catch((error) => {
          window.alert(error.message);
        });
    } catch (error) {
      console.log('Error en la base de datos');
      return this.router.navigate(['/errorBBDD']);
    }
  }
}
