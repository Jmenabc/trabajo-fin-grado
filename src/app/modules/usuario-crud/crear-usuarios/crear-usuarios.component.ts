import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css'],
})
export class CrearUsuariosComponent {
  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private firestore: UsuarioService,
    // private _location: Location
  ) {}
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
    rol:[1]
  });

   crearCliente() {
     this.firestore.Crear(this.coleccion, this.formUsuarios.value);
    //  this._location.back();
   }
}
