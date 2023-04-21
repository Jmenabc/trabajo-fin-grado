import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PantalonesService } from 'src/app/services/pantalones.service';

@Component({
  selector: 'app-crear-pantalon',
  templateUrl: './crear-pantalon.component.html',
  styleUrls: ['./crear-pantalon.component.css']
})
export class CrearPantalonComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: PantalonesService
  ) // private _location: Location
  {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Pantalones';
  documentId: string = '';
  cliente?: any;

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formPantalones = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
  });


  CrearPatalones() {
    this.firebase.Crear(this.coleccion,this.formPantalones.value);
  }
}
