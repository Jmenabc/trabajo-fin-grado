import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';

@Component({
  selector: 'app-crear-pantalon',
  templateUrl: './crear-pantalon.component.html',
  styleUrls: ['./crear-pantalon.component.css'],
})
export class CrearPantalonComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: PantalonesService,
    private router: Router,
    private _location: Location,
    private log: LoggerService
  ) {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Pantalones';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formPantalones = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: uuidv4(),
    url: '',
  });

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
  CrearPatalones() {
    try {
      this.firebase.Crear(this.coleccion, this.formPantalones.value);
      this._location.back();
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
