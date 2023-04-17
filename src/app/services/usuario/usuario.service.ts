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
    this.firestore
      .collection('Usuarios')
      .doc(UsuarioId)
      .valueChanges()
      .subscribe((usuario: any) => {
        // Acceder al rol del usuario en el documento y almacenarlo en una variable
        const rolUsuario = usuario.rol.toString();
        return rolUsuario;
      });
  }

  cogerTodos(coleccion: string) {
    return this.firestore.collection(coleccion).snapshotChanges();
  }
  //Metodo para coger un documento de la base de datos
  cogerUno(coleccion: string, documentId: string) {
    return this.firestore
      .collection(coleccion)
      .doc(documentId)
      .snapshotChanges();
  }
  //Metodo para actualizar un documento de la base de datos
  Actualizar(coleccion: string, documentId: string, data: any) {
    return this.firestore.collection(coleccion).doc(documentId).update(data);
  }
  //Metodo para crear un documento de la base de datos
  Crear(coleccion: string, data: any) {
    return this.firestore.collection(coleccion).add(data);
  }
  //Metodo para eliminar un documento de la base de datos
  Eliminar(coleccion: string, documentId: string) {
    return this.firestore.collection(coleccion).doc(documentId).delete();
  }
}
