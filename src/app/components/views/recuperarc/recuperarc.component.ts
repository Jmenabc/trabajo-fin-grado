import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-recuperarc',
  templateUrl: './recuperarc.component.html',
  styleUrls: ['./recuperarc.component.css'],
})
export class RecuperarcComponent {
  public email: string = '';
  public mensaje: string = '';
  public error: any = null;

  constructor(private afAuth: AngularFireAuth) {}

  public enviarRecuperacionContrasena(): void {
    this.afAuth
      .sendPasswordResetEmail(this.email)
      .then(() => {
        this.mensaje =
          'Se ha enviado un correo de recuperación de contraseña a tu dirección de correo electrónico.';
        this.error = null;
      })
      .catch((error) => {
        this.mensaje = '';
        this.error = error;
      });
  }

  
}
