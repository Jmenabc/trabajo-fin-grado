import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
/*
  Clase que contiene los metodos de creacion de pantalones
  @author
*/
export class CrearPantalonComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: PantalonesService,
    private router: Router,
    private _location: Location,
    private log: LoggerService
  ) { }
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Pantalones';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  rellenar: string = "";

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formPantalones = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    marca: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    precio: ['', [Validators.required, Validators.pattern(/^[0-9\s]*$/)]],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: [uuidv4()],
    url: ['', Validators.required]
  });
  //Metodo ir para la ventana de atras
  irAtras() {
    this._location.back();
  }
  //Metodo que añade al log
  AnadirAlLog(data: string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo que crea pantalones
  CrearPatalones() {
    try {
      if (this.formPantalones.invalid) {
        this.rellenar = "Revisa el formulario (No se aceptan huecos en blanco)";
      }
      if (this.formPantalones.valid) {
        this.AnadirAlLog('Creando Pantalon')
        this.firebase.Crear(this.coleccion, this.formPantalones.value);
        this._location.back();
        this.AnadirAlLog('Pantalon creado con exito')
      }
      this.AnadirAlLog('Formulario invalido');
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
