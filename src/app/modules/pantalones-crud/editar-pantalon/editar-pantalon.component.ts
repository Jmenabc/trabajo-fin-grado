import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';

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
    private ruta: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal
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
    const modalRef = this.modalService.open(ConfirmacionActivaComponent);
    modalRef.componentInstance.documentId = this.documentId;
    modalRef.result
      .then((result) => {
        if (result === 'confirmar') {
          this.firebase.Eliminar(this.coleccion, this.documentId);
          this._location.back();
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  ngOnInit() {
    this.EditarDatos();
  }
}
