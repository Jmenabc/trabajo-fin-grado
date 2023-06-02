import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-camisetas',
  templateUrl: './ver-camisetas.component.html',
  styleUrls: ['./ver-camisetas.component.css'],
})
/*
  Clase que carga las camisetas en la vista
  @author Jmenabc
*/
export class VerCamisetasComponent {
  constructor(private _location: Location,private log: LoggerService,private firebase: CamisetasService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Camisetas';
  camisetasLista: any[] = [];
  documentId: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  //Metodo ir para la ventana de atras
  irAtras() {
    this._location.back();
  }
//Metodo para recoger todos las camisetas
  getTodosLasCamisetas() {
    try {
      this.AnadirAlLog('Recogiendo camisetas')
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.camisetasLista = [];
        resp.forEach((camisetasSnapshot: any) => {
          this.camisetasLista.push({
            ...camisetasSnapshot.payload.doc.data(),
            documentId: camisetasSnapshot.payload.doc.id,
          });
        });
      });
      this.AnadirAlLog('Camisetas recogidas');
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  //Metodo que añade al log
  AnadirAlLog(data:string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato:`[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLasCamisetas();
  }
}
