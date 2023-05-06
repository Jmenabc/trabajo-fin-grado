import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-crear-botines',
  templateUrl: './crear-botines.component.html',
  styleUrls: ['./crear-botines.component.css']
})
export class CrearBotinesComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: BotinesService
  ) // private _location: Location
  {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Botines';
  documentId: string = '';
  cliente?: any;

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formBotines = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
  });


  CrearBotines() {
    this.firebase.Crear(this.coleccion,this.formBotines.value);
  }
}