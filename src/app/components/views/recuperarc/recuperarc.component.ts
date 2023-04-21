import { Component } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperarc',
  templateUrl: './recuperarc.component.html',
  styleUrls: ['./recuperarc.component.css'],
})
export class RecuperarcComponent {

  email: string = "";
  constructor(private afAuth: AngularFireAuth) {}

  sendPasswordResetEmail() {
    this.afAuth.sendPasswordResetEmail(this.email)
      .then(() => console.log('Se ha enviado el correo de recuperación de contraseña.'))
      .catch((error) => console.log('Ha ocurrido un error:', error));
  }
}
