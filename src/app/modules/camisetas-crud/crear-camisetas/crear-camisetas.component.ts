import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
@Component({
  selector: 'app-crear-camisetas',
  templateUrl: './crear-camisetas.component.html',
  styleUrls: ['./crear-camisetas.component.css'],
})
export class CrearCamisetasComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: CamisetasService,
    private router: Router,
    private _location: Location,
    private log: LoggerService

  ) {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Camisetas';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formCamisetas = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: uuidv4(),
    url: ''
  });

  CrearBotines() {
    try {

      this.firebase.Crear(this.coleccion, this.formCamisetas.value);
      this._location.back();
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
}
