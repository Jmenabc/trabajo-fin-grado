import { Component } from '@angular/core';
import { PantalonesService } from 'src/app/services/pantalones.service';

@Component({
  selector: 'app-ver-pantalon',
  templateUrl: './ver-pantalon.component.html',
  styleUrls: ['./ver-pantalon.component.css']
})
export class VerPantalonComponent {
  constructor(private firebase: PantalonesService) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Pantalones';
  pantalonesLista: any[] = [];
  documentId: string = '';

  getTodosLosPantalones() {
    this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
      this.pantalonesLista = [];
      resp.forEach((botinesSnapshot: any) => {
        this.pantalonesLista.push({
          ...botinesSnapshot.payload.doc.data(),
          documentId: botinesSnapshot.payload.doc.id,
        });
      });
    });
  }

  ngOnInit() {
    this.getTodosLosPantalones();
  }
}
