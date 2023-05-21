import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pantalon',
  templateUrl: './crear-pantalon.component.html',
  styleUrls: ['./crear-pantalon.component.css'],
})
export class CrearPantalonComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: PantalonesService,
    private router: Router // private _location: Location
  ) {}
  //La coleccion donde vamos a añadir los juguetes
  coleccion = 'Pantalones';
  documentId: string = '';
  cliente?: any;

  //Declaramos nuestro formulario para enviar los datos del botin registrado
  formPantalones = this.fb.group({
    nombre: [],
    marca: [],
    precio: [],
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid: uuidv4(),
    url: '',
  });

  CrearPatalones() {
    try {
      this.firebase.Crear(this.coleccion, this.formPantalones.value);
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
