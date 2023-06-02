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
export class ListaCamisetasComponent {
  constructor(private log: LoggerService,private firebase: CamisetasService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Camisetas';
  camisetasLista: any[] = [];
  documentId: string = '';
  nombre: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  getTodosLasCamisetas() {
    try {
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.camisetasLista = [];
        resp.forEach((camisetasSnapshot: any) => {
          this.camisetasLista.push({
            ...camisetasSnapshot.payload.doc.data(),
            documentId: camisetasSnapshot.payload.doc.id,
          });
          this.dataSource = new MatTableDataSource(this.camisetasLista);

        });
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.getTodosLasCamisetas();
  }
}
