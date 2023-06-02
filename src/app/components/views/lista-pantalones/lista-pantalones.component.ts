import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-pantalones',
  templateUrl: './lista-pantalones.component.html',
  styleUrls: ['./lista-pantalones.component.css'],
})
export class ListaPantalonesComponent {
  constructor(private fs: PantalonesService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Pantalones';
  pantalonesLista: any[] = [];
  documentId: string = '';
  nombre: string = '';

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTodosLosPantalones() {
    try {
      this.fs.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.pantalonesLista = [];
        resp.forEach((botinesSnapshot: any) => {
          this.pantalonesLista.push({
            ...botinesSnapshot.payload.doc.data(),
            documentId: botinesSnapshot.payload.doc.id,
          });
          this.dataSource = new MatTableDataSource(this.pantalonesLista);
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
    this.getTodosLosPantalones();
  }
}
