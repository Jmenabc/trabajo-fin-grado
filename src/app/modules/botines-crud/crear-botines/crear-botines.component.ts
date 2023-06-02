import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { v4 as uuidv4 } from 'uuid';
import { Location } from '@angular/common';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-crear-botines',
  templateUrl: './crear-botines.component.html',
  styleUrls: ['./crear-botines.component.css']
})
/*
  Clase que contiene los metodos de creacion de botines
  @author
*/
export class CrearBotinesComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: BotinesService,
    private router: Router,
    private log: LoggerService,
    private _location: Location) { }
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Botines';
  documentId: string = '';
  cliente?: any;
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  rellenar: string = "";
  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formBotines = this.fb.group({
    nombre: ['', Validators.required],
    marca: ['', Validators.required],
    precio: ['', Validators.required],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: [uuidv4()],
    url: ['', Validators.required]
  });

  //Metodo para crear botines
  CrearBotines() {
    try {
      if (this.formBotines.valid) {
        this.AnadirAlLog('Creando objeto')
        this.firebase.Crear(this.coleccion, this.formBotines.value);
        this._location.back();
        this.AnadirAlLog('Objeto creado con exito')
      }
      this.AnadirAlLog('Formulario invalido');
      this.rellenar = "Rellene todos los campos";
    } catch (error) {
      this.AnadirAlLog("Error al crear botin");
      this.router.navigate(['/errorBBDD']);
    }
  }
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
}
