import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';

@Component({
  selector: 'app-ver-camisetas',
  templateUrl: './ver-camisetas.component.html',
  styleUrls: ['./ver-camisetas.component.css'],
})
export class VerCamisetasComponent {
  constructor(private firebase: CamisetasService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Camisetas';
  camisetasLista: any[] = [];
  documentId: string = '';

  getTodosLasCamisetas() {
    try {
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.camisetasLista = [];
        resp.forEach((camisetasSnapshot: any) => {
          this.camisetasLista.push({
            ...camisetasSnapshot.payload.doc.data(),
            documentId: camisetasSnapshot.payload.doc.id,
          });
        });
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLasCamisetas();
  }
}
