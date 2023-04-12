import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private firestore: AngularFirestore) {}

  //Metodo que recoge el rol del usuario
  RecogerRol(UsuarioId: string): any {
    this.firestore.collection('Usuarios').doc(UsuarioId).valueChanges().subscribe((usuario: any) => {
      // Acceder al rol del usuario en el documento y almacenarlo en una variable
      const rolUsuario = usuario.rol.toString();
      return rolUsuario;
    });
  }
}
