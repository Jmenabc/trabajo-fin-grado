import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';

@Component({
  selector: 'app-crear-camisetas',
  templateUrl: './crear-camisetas.component.html',
  styleUrls: ['./crear-camisetas.component.css'],
})
export class CrearCamisetasComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: CamisetasService// private _location: Location
  ) {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Camisetas';
  documentId: string = '';
  cliente?: any;

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formCamisetas = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
  });

  CrearBotines() {
    this.firebase.Crear(this.coleccion, this.formCamisetas.value);
  }
}
