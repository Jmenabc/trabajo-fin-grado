import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { MatTableDataSource } from '@angular/material/table';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
@Component({
  selector: 'app-lista-botines',
  templateUrl: './lista-botines.component.html',
  styleUrls: ['./lista-botines.component.css'],
})
/*
  Pagina que contiene la lista de los botines de la pagina
  @author Jmenabc
*/
export class ListaBotinesComponent {
  constructor(private log: LoggerService, private firebase: BotinesService, private router: Router) { }
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  dataSource!: MatTableDataSource<any>;
  coleccion = 'Botines';
  botinesLista: any[] = [];
  documentId: string = '';
  filtro: string = '';
  nombre: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
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
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }



  //Metodo que recoge todos los botines
  getTodosLosBotines() {
    try {
      this.AnadirAlLog('Recogemos los botines');
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
      this.AnadirAlLog('Botines recogidos')

    } catch (error) {
      this.AnadirAlLog('Error al recoger los botines');
      this.router.navigate(['/errorBBDD']);
    }
  }


  ngOnInit() {
    this.getTodosLosBotines();
  }
}
