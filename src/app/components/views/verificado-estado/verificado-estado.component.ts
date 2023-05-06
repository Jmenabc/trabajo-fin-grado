import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

@Component({
  selector: 'app-verificado-estado',
  templateUrl: './verificado-estado.component.html',
  styleUrls: ['./verificado-estado.component.css'],
})
export class VerificadoEstadoComponent {
  constructor(private router: Router) {}
  estadoText: string ="";

  checkEmailVerification() {
  const user = firebase.auth().currentUser;
  console.log(user!.emailVerified)
  if (user!.emailVerified == true) {
    this.router.navigate(["/Menu"])
  } else {
    this.estadoText = "Vaya a su correo y compruebe que le haya llegado el correo, sino mire en spam"
  }
}

ngOnInit() {
}
}
