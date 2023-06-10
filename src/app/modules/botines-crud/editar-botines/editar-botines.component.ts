import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-editar-botines',
  templateUrl: './editar-botines.component.html',
  styleUrls: ['./editar-botines.component.css'],
})
/*
  Clase que contiene los metodos para actualizar  y eliminar
  @author Jmenabc
*/
export class EditarBotinesComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Botines';
  documentId: string = '';
  usuario: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  constructor(
    private firebase: BotinesService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private router: Router,
    private log: LoggerService

  ) {}

  formBotines = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
    mdDate: [],
    mdUuid: [],
    url: '',
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
          this.formBotines.setValue(resp.payload.data());
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
        this.formBotines.value
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
            this.router.navigate(['botinesCRUD/botines'])
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
