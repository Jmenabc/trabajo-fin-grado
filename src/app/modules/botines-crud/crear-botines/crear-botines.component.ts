import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-crear-botines',
  templateUrl: './crear-botines.component.html',
  styleUrls: ['./crear-botines.component.css']
})
export class CrearBotinesComponent {
  constructor(
    private fb: FormBuilder,
    private firebase: BotinesService,
    private router: Router
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
    mdDate: [format(new Date(), 'dd/MM/yyyy')],
    mdUuid:  uuidv4(),
    url: ''
  });


  CrearBotines() {
    try {
      this.firebase.Crear(this.coleccion,this.formBotines.value);
    } catch (error) {
      console.log("Error en la base de datos");
      this.router.navigate(['/errorBBDD']);
    }
  }
}
