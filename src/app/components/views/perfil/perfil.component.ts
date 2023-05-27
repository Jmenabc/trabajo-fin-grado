import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  email: string = localStorage.getItem("correo")!.toString();
  uuid: string = localStorage.getItem("uuid")!.toString();
  rol: string = localStorage.getItem("rol")!.toString();
}
