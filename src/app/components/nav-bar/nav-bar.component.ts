import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  authF = getAuth();
  //Variable donde guardamos el uid del usuario
  UsuarioUID: string = this.authF.currentUser!.uid.toString();
  constructor(private UserS: UsuarioService) {}
  recogerRol() {
     return this.UserS.RecogerRol(this.UsuarioUID);
  }

  RolUsuario: string = this.recogerRol(this.UsuarioUID);
}
