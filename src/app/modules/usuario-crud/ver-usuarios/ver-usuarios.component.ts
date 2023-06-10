import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
})
/*
  Clase que carga de los usuarios en la vista
  @author Jmenabc
*/
export class VerUsuariosComponent {
  constructor(private log: LoggerService, private _location: Location, private firebase: UsuarioService, private router: Router) { }
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Usuarios';
  usuariosLista: any[] = [];
  documentId: string = '';
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  //Metodo ir para la ventana de atras
  irAtras() {
    this.router.navigate(['usuarioCRUD/OpcionesUsuarios'])
  }
  //Metodo para recoger todos los clientes/usuarios
  getTodosLosClientes() {
    try {
      this.AnadirAlLog('Recogiendo usuarios')
      this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
        this.usuariosLista = [];
        resp.forEach((usuariosSnapshot: any) => {
          this.usuariosLista.push({
            ...usuariosSnapshot.payload.doc.data(),
            documentId: usuariosSnapshot.payload.doc.id,
          });
          console.log(this.usuariosLista);
        });
      });
      this.AnadirAlLog('usuarios recogidos')
    } catch (error) {
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
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
      this.AnadirAlLog('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLosClientes();
  }
}
