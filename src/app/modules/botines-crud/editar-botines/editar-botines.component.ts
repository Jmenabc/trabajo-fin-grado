import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-botines',
  templateUrl: './editar-botines.component.html',
  styleUrls: ['./editar-botines.component.css'],
})
export class EditarBotinesComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Botines';
  documentId: string = '';
  usuario: any;

  constructor(
    private firebase: BotinesService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private _location: Location
  ) {}

  formBotines = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
    mdDate: [],
    mdUuid: [],
    url: '',
  });

  EditarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.formBotines.setValue(resp.payload.data());
      });
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Actualizar(
      this.coleccion,
      this.documentId,
      this.formBotines.value
    );
    // this._location.back();
  }

  Eliminar() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    const confirmacion = prompt(
      `Escribe "${this.documentId}" para confirmar la eliminación`
    );
    if (confirmacion === this.documentId) {
      this.firebase
        .Eliminar(this.coleccion, this.documentId)
        .then(() => {
          console.log('Elemento eliminado correctamente');
          this.firebase.Eliminar(this.coleccion, this.documentId);
          this._location.back();
        })
        .catch((error) => {
          console.error('Error al eliminar el elemento:', error);
        });
    }
  }

  ngOnInit() {
    this.EditarDatos();
  }
}
