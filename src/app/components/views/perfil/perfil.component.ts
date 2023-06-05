import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
/*
  Clase que tiene el contenido a mostrar en el perfil
  @author Jmenabc
*/
export class PerfilComponent {
  email: string = localStorage.getItem("correo")!;
  uuid: string = localStorage.getItem("uuid")!;
  rol: string = localStorage.getItem("rol")!;
  constructor(private agfire: AngularFireAuth, private route: Router) { }

  eliminarUsuario() {
    this.agfire.currentUser.then(user => user?.delete());
  }

}
