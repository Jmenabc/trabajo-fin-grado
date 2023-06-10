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
/*
  Clase que contiene los metodos para actualizar  y eliminar
  @author Jmenabc
*/
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
  //Metodo ir para la ventana de atras
  irAtras() {
    this.router.navigate(['/crudselector'])
  }
//Metodo que carga los datos
EditarDatos() {
  try {
    this.AnadirAlLog('Cargamos los datos');
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.formCamisetas.setValue(resp.payload.data());
      });
      this.AnadirAlLog('Datos cargados');
  } catch (error) {
    this.AnadirAlLog('Error en la base de datos');
    this.router.navigate(['/errorBBDD']);
  }
}
//Metodo que añade al log
AnadirAlLog(data:string) {
  try {
    this.log.AñadirLog().update({
      data: firebase.firestore.FieldValue.arrayUnion({
        dato:`[${this.fecha}]:${data}`
      }),
    });
  } catch (error) {
    this.AnadirAlLog('Error en la base de datos');
    this.router.navigate(['/errorBBDD']);
  }
}
//Metodo para actualizar los datos del portero
ActualizarDatos() {
  try {
    this.AnadirAlLog('Actualizando datos');
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase.Actualizar(
      this.coleccion,
      this.documentId,
      this.formCamisetas.value
    );
    this._location.back();
    this.AnadirAlLog('datos actualizados')
  } catch (error) {
    this.AnadirAlLog('Error en la base de datos');
    this.router.navigate(['/errorBBDD']);
  }
  // this._location.back();
}
//Metodo para eliminar
Eliminar() {
  try {
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.AnadirAlLog(`Entrando en eliminar: ${this.documentId}`);
    const modalRef = this.modalService.open(ConfirmacionActivaComponent);
    modalRef.componentInstance.documentId = this.documentId;
    modalRef.result
      .then((result) => {
        if (result === 'confirmar') {
          this.AnadirAlLog(`Eliminando objeto: ${this.documentId}`)
          this.firebase.Eliminar(this.coleccion, this.documentId);
          this.router.navigate(['camisetasCRUD/camisetas'])
          this.AnadirAlLog(`Objeto ${this.documentId} eliminado con exito`)
        }
      })
      .catch((error) => {
        this.AnadirAlLog(error);
      });
  } catch (error) {
    this.AnadirAlLog('Error en la base de datos');
    this.router.navigate(['/errorBBDD']);
  }
}

  ngOnInit() {
    this.EditarDatos();
  }
}
