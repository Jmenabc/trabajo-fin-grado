import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crear-camisetas',
  templateUrl: './crear-camisetas.component.html',
  styleUrls: ['./crear-camisetas.component.css'],
})
export class CrearCamisetasComponent {
  constructor(
    private fb: FormBuilder,
    private log: LoggerService,
    private firebase: CamisetasService,
    private router: Router,
    private _location: Location
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
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: uuidv4(),
  });

  CrearBotines() {
    try {
      this.log.log('Creando camiseta');
      this.firebase.Crear(this.coleccion, this.formCamisetas.value);
      this.log.log('Saliendo de crear camiseta');
      this._location.back();
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
