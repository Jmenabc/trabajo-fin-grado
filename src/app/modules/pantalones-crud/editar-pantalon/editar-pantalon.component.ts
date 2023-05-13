import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';

@Component({
  selector: 'app-editar-pantalon',
  templateUrl: './editar-pantalon.component.html',
  styleUrls: ['./editar-pantalon.component.css'],
})
export class EditarPantalonComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Pantalones';
  documentId: string = '';
  usuario: any;

  constructor(
    private firebase: PantalonesService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute
  ) {}

  formPantalones = this.fb.group({
    nombre: '',
    marca: '',
    precio: 0,
    mdDate: [],
    mdUuid: [],
    url: ''
  });

  EditarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.formPantalones.setValue(resp.payload.data());
      });
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Actualizar(
      this.coleccion,
      this.documentId,
      this.formPantalones.value
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
