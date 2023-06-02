import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-ver-botines',
  templateUrl: './ver-botines.component.html',
  styleUrls: ['./ver-botines.component.css'],
})
export class VerBotinesComponent {
  constructor(    private log: LoggerService
,    private firebase: BotinesService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Botines';
  botinesLista: any[] = [];
  documentId: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  getTodosLosBotines() {
    try {
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.botinesLista = [];
        resp.forEach((botinesSnapshot: any) => {
          this.botinesLista.push({
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
  AnadirAlLog(data:string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato:`[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLosBotines();
  }
}
