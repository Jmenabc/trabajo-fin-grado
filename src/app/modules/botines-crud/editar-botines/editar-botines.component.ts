import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';

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
    private _location: Location,
    private modalService: NgbModal,
    private router: Router
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
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.formBotines.setValue(resp.payload.data());
        });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase.Actualizar(
        this.coleccion,
        this.documentId,
        this.formBotines.value
      );
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
    // this._location.back();
  }

  Eliminar() {
    try {
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
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.EditarDatos();
  }
}
