import { Component } from '@angular/core';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';

@Component({
  selector: 'app-ver-camisetas',
  templateUrl: './ver-camisetas.component.html',
  styleUrls: ['./ver-camisetas.component.css'],
})
export class VerCamisetasComponent {
  constructor(private firebase: CamisetasService) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Camisetas';
  camisetasLista: any[] = [];
  documentId: string = '';

  getTodosLasCamisetas() {
    this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
      this.camisetasLista = [];
      resp.forEach((camisetasSnapshot: any) => {
        this.camisetasLista.push({
          ...camisetasSnapshot.payload.doc.data(),
          documentId: camisetasSnapshot.payload.doc.id,
        });
      });
    });
  }

  ngOnInit() {
    this.getTodosLasCamisetas();
  }
}
