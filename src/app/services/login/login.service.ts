import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {

  getAuth,

} from '@angular/fire/auth';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
/*
  Servicio que contiene mis metodos (Login) a la base de datos
  @author Jmenabc
*/
export class LoginService {
  //Creamos nuetsra instancia de la clase auth para poder utilizar sus servicios
  authF = getAuth();
  constructor(private firestore: AngularFirestore, private router: Router) { }

  cogerRolUsuario(uuid: string) {
    return this.firestore
      .collection('Usuarios', (ref) => ref.where('uuid', '==', uuid))
      .snapshotChanges();
  }
}
