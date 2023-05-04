import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-verificado-estado',
  templateUrl: './verificado-estado.component.html',
  styleUrls: ['./verificado-estado.component.css'],
})
export class VerificadoEstadoComponent {
  constructor(private afAuth: AngularFireAuth) {}

  
}
