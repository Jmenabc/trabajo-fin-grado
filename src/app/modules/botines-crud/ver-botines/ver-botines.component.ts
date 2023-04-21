import { Component } from '@angular/core';
import { BotinesService } from 'src/app/services/botines/botines.service';

@Component({
  selector: 'app-ver-botines',
  templateUrl: './ver-botines.component.html',
  styleUrls: ['./ver-botines.component.css'],
})
export class VerBotinesComponent {
  constructor(private firebase: BotinesService) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Botines';
  botinesLista: any[] = [];
  documentId: string = '';

  getTodosLosBotines() {
    this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
      this.botinesLista = [];
      resp.forEach((botinesSnapshot: any) => {
        this.botinesLista.push({
          ...botinesSnapshot.payload.doc.data(),
          documentId: botinesSnapshot.payload.doc.id,
        });
      });
    });
  }

  ngOnInit() {
    this.getTodosLosBotines();
  }
}
