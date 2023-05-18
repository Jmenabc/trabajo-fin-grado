import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SHA256 } from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { format } from 'date-fns';
import { RegistroService } from 'src/app/services/registro/registro.service';

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
    private RegistroService: RegistroService
  ) // private _location: Location
  {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Usuarios';
  documentId: string = '';
  cliente?: any;

  //Declaramos nuestro formulario para enviar los datos del juguete
  formUsuarios = this.fb.group({
    nombre: [],
    apellidos: [],
    password: [],
    correo: [],
    telefono: [],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    uuid: '',
    rol: [1],
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
        localStorage.setItem("uuid",uuid)
        //enviamos el correo de verificación
        result.user!.sendEmailVerification();
        //Actualizamos el valor del formulario
        this.formUsuarios.patchValue({
          uuid: result.user!.uid,
        });
        console.log("Entrando a Registro.ts/Registrarse || Enviando el correo y contraseña que recibimos de nuestro formulario");
        this.firebase.Crear(this.coleccion,this.formUsuarios.value)
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
