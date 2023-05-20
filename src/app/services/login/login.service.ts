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
    try {
      return this.firestore
        .collection('Usuarios', (ref) => ref.where('uuid', '==', uuid))
        .snapshotChanges();
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
}
