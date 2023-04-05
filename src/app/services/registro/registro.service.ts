import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { collection, getDocs, query, where } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor(private firestore: AngularFirestore) { }

  //Metodo para crear usuario
  CrearUsuario(data: any) {
    return this.firestore.collection("usuarios").add(data);
  }
}
