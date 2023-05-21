import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CamisetasService {
  constructor(private firestore: AngularFirestore, private router: Router) {}

  cogerTodos(coleccion: string) {
    try {
      return this.firestore.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
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
