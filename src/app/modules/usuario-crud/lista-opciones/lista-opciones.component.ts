import { Component } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-opciones',
  templateUrl: './lista-opciones.component.html',
  styleUrls: ['./lista-opciones.component.css']
})
export class ListaOpcionesComponent {
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  constructor(private router: Router,
    private log: LoggerService) { }
  //Metodo que añade al log
  AnadirAlLog(data: string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
}
