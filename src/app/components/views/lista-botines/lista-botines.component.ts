import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';

@Component({
  selector: 'app-lista-botines',
  templateUrl: './lista-botines.component.html',
  styleUrls: ['./lista-botines.component.css'],
})
export class ListaBotinesComponent {
  constructor(private firebase: BotinesService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Botines';
  botinesLista: any[] = [];
  documentId: string = '';
  filtro : string = "";

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

  Filtrar() {
    this.firebase.Filtrar(this.coleccion,this.filtro).subscribe(
      (resp: any) => {
        this.botinesLista = [];
        resp.forEach((botinesSnapshot: any) => {
          this.botinesLista.push(
            {
              ...botinesSnapshot.payload.doc.data(),
              documentId: botinesSnapshot.payload.doc.id,
            }
          )
        });
      })
  }

  ngOnInit() {
    this.getTodosLosBotines();
  }
}
