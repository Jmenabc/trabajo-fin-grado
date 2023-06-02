import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-botines',
  templateUrl: './lista-botines.component.html',
  styleUrls: ['./lista-botines.component.css'],
})
export class ListaBotinesComponent {
  constructor(private firebase: BotinesService, private router: Router) { }
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Botines';
  botinesLista: any[] = [];
  documentId: string = '';
  filtro: string = '';
  nombre: string = '';


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }






  getTodosLosBotines() {
    try {
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.botinesLista = [];
        resp.forEach((botinesSnapshot: any) => {
          this.botinesLista.push({
            ...botinesSnapshot.payload.doc.data(),
            documentId: botinesSnapshot.payload.doc.id,

          });
          this.dataSource = new MatTableDataSource(this.botinesLista);
        });
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }


  validarNombre() {
    const pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(this.nombre);
  }

  ngOnInit() {
    this.getTodosLosBotines();
    console.log(this.dataSource.filteredData)
  }
}
