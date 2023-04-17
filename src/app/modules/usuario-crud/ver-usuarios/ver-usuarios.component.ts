import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
})
export class VerUsuariosComponent {
  constructor(private firebase: UsuarioService) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Usuarios';
  usuariosLista: any[] = [];
  documentId: string = '';

  getTodosLosClientes() {
    this.firebase.cogerTodos(this.coleccion).subscribe((resp: any) => {
      this.usuariosLista = [];
      resp.forEach((clientesSnapshot: any) => {
        this.usuariosLista.push({
          ...clientesSnapshot.payload.doc.data(),
          documentId: clientesSnapshot.payload.doc.id,
        });
      });
    });
  }

  ngOnInit() {
    this.getTodosLosClientes();
  }
}
