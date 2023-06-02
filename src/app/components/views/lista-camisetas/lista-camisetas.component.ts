import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-lista-camisetas',
  templateUrl: './lista-camisetas.component.html',
  styleUrls: ['./lista-camisetas.component.css']
})
/*
  Pagina que contiene la lista de las camisetas de la pagina
  @author Jmenabc
*/
export class ListaCamisetasComponent {
  constructor(private log: LoggerService, private firebase: CamisetasService, private router: Router) { }
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Camisetas';
  camisetasLista: any[] = [];
  documentId: string = '';
  nombre: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  //Metodo que recoge todos los pantalones
  getTodosLasCamisetas() {
    try {
      this.AnadirAlLog('Recogemos los camisetas');
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.camisetasLista = [];
        resp.forEach((camisetasSnapshot: any) => {
          this.camisetasLista.push({
            ...camisetasSnapshot.payload.doc.data(),
            documentId: camisetasSnapshot.payload.doc.id,
          });
          this.dataSource = new MatTableDataSource(this.camisetasLista);
          this.AnadirAlLog('Camisetas recogidas');
        });
      });
    } catch (error) {
      this.AnadirAlLog('Error al recoger camisetas');
      this.router.navigate(['/errorBBDD']);
    }
  }
  //Metodo que aplica el filtro para buscar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Metodo que añade al log
  AnadirAlLog(data: string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      this.AnadirAlLog('Recogemos los camisetas');('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLasCamisetas();
  }
}
