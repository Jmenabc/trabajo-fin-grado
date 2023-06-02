import { Component } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-selector',
  templateUrl: './crud-selector.component.html',
  styleUrls: ['./crud-selector.component.css']
})
/*
  Pagina donde podremos seleccionar el crud correspondiente
  @author Jmenabc
*/
export class CrudSelectorComponent {
fecha: any = format(new Date(), 'dd/MM/yyyy');
  constructor(private log: LoggerService,private router: Router,) {}
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
    this.AnadirAlLog('Entrando al selector de CRUD');
  }
}
