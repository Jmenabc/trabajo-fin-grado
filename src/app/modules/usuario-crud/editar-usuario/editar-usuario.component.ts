import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Usuarios';
  documentId: string = '';
  usuario: any;

  constructor(
    private firebase: UsuarioService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute
  ) {}

  formUsuario = this.fb.group({
    nombre: [],
    apellidos: [],
    contraseña: '',
    email: [],
    telefono: [],
    mdDate: [],
    uuid: '',
    rol: [],
  });

  EditarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.formUsuario.setValue(resp.payload.data());
      });
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Actualizar(
      this.coleccion,
      this.documentId,
      this.formUsuario.value
    );
    // this._location.back();
  }

  Eliminar() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Eliminar(this.coleccion, this.documentId);
    // this._location.back();
  }

  ngOnInit() {
    this.EditarDatos();
  }
}
