import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SHA256 } from 'crypto-js';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private router: Router
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
    contraseña: [],
    correo: [],
    rol: [1],
  });

  CrearUsuario(email: string, password: string) {
    //Antes de nada hacemos un hash de la contraseña
    const hash = SHA256(password).toString();
    console.log('crear-usuarios.module.ts/CREAR || Metodo CrearUsuario');
    return this.afAuth
      .createUserWithEmailAndPassword(email, hash)
      .then((result) => {
        console.log(
          'Entrando a crear-usuarios.module.ts/CREAR || Enviando el correo y contraseña que recibimos de nuestro formulario'
        );
        //Cambiamos el valor del campo contraseña para subirlo encryptado
        // this.formUsuarios.get('contraseña')!.setValue(hash);
        this.firebase.Crear(this.coleccion,this.formUsuarios.value);
        console.log(hash);
        this.router.navigate(['/Menu']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
