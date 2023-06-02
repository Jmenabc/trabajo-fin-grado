import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';
import { Location } from '@angular/common';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { format } from 'date-fns';

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
    private ruta: ActivatedRoute,
    private cService: CarritoService,
    private _location: Location,
    private modalService: NgbModal,
    private router: Router,
    private log: LoggerService

  ) {}
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  formCamisetas = this.fb.group({
    nombre: '',
    marca: '',
    precio: 0,
    url: '',
    mdDate: [],
    mdUuid: [],
  });

  EditarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.formCamisetas.setValue(resp.payload.data());
        });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

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

  //Metodo para actualizar los datos del portero
  ActualizarDatos() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase.Actualizar(
        this.coleccion,
        this.documentId,
        this.formCamisetas.value
      );
        this._location.back();
      // this._location.back();
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
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
