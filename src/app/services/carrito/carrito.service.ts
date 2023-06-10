import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
/*
  Servicio que contiene mis metodos (Carrito) a la base de datos
  @author Jmenabc
*/
export class CarritoService {
  constructor(private firestore: AngularFirestore, private router: Router) { }
  //Datos necesarios para el acceso al carrito
  collection: string = 'Usuarios';
  collectionCarrito: string = 'Carrito';
  uuid = localStorage.getItem('uuid');

  eliminarObjeto(objetoId: string) {
    // Obtener la referencia al objeto en el carrito
    const objetoRef = this.firestore.collection('carrito').doc(objetoId);
    // Eliminar el objeto del carrito
    return objetoRef.delete();
  }

  existeCarro() {
    return this.firestore.collection(this.collection).doc(this.uuid!);
  }

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
      .doc(this.uuid!);
  }

  docDir() {
    return this.firestore
      .collection(this.collection)
      .doc(this.uuid!)
      .collection(this.collectionCarrito)
      .doc(this.uuid!);
  }
}
