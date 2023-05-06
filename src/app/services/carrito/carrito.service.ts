import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(private firestore: AngularFirestore) {}
  //Datos necesarios para el acceso al carrito
  collection: string = 'Usuarios';
  collectionCarrito: string = 'Carrito';
  uuid = localStorage.getItem('uuid');

  cogerTodos() {
    return this.firestore
      .collection(this.collection)
      .doc(this.uuid!)
      .collection(this.collectionCarrito)
      .snapshotChanges();
  }

  AñadirFav() {
    return this.firestore
      .collection(this.collection)
      .doc(this.uuid!)
      .collection(this.collectionCarrito)
      .doc(this.uuid!)
  }
}
