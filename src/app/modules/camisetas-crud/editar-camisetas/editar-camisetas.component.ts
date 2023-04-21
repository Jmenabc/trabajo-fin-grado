import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';

@Component({
  selector: 'app-editar-camisetas',
  templateUrl: './editar-camisetas.component.html',
  styleUrls: ['./editar-camisetas.component.css'],
})
export class EditarCamisetasComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Camisetas';
  documentId: string = '';
  usuario: any;

  constructor(
    private firebase: CamisetasService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute
  ) {}

  formCamisetas = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
  });

  EditarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.formCamisetas.setValue(resp.payload.data());
      });
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Actualizar(
      this.coleccion,
      this.documentId,
      this.formCamisetas.value
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
