import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-lista-pantalones',
  templateUrl: './lista-pantalones.component.html',
  styleUrls: ['./lista-pantalones.component.css'],
})
export class ListaPantalonesComponent {
  constructor(private log: LoggerService,private fs: PantalonesService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Pantalones';
  pantalonesLista: any[] = [];
  documentId: string = '';
  nombre: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
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
    this.getTodosLosPantalones();
  }
}
