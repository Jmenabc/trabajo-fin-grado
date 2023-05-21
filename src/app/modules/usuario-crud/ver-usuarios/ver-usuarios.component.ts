import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css'],
})
export class VerUsuariosComponent {
  constructor(private firebase: UsuarioService, private router: Router) {}
  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  coleccion = 'Usuarios';
  usuariosLista: any[] = [];
  documentId: string = '';

  getTodosLosClientes() {
    try {
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
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.getTodosLosClientes();
  }
}
