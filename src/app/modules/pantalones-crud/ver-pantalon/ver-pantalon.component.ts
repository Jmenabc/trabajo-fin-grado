import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';

@Component({
  selector: 'app-ver-pantalon',
  templateUrl: './ver-pantalon.component.html',
  styleUrls: ['./ver-pantalon.component.css'],
})
export class VerPantalonComponent {
  constructor(private log: LoggerService, private fs: PantalonesService, private router: Router) { }
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Pantalones';
  pantalonesLista: any[] = [];
  documentId: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  getTodosLosPantalones() {
    try {
      this.fs.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.pantalonesLista = [];
        resp.forEach((botinesSnapshot: any) => {
          this.pantalonesLista.push({
            ...botinesSnapshot.payload.doc.data(),
            documentId: botinesSnapshot.payload.doc.id,
          });
        });
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
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
  ngOnInit() {
    this.getTodosLosPantalones();
  }
}
