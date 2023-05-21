import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  Auth,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //Creamos nuetsra instancia de la clase auth para poder utilizar sus servicios
  authF = getAuth();
  constructor(private firestore: AngularFirestore, private router: Router) {}

  cogerRolUsuario(uuid: string) {
    return this.firestore
      .collection('Usuarios', (ref) => ref.where('uuid', '==', uuid))
      .snapshotChanges();
  }
}
