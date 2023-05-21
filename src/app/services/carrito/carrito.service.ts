import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(private firestore: AngularFirestore, private router: Router) {}
  //Datos necesarios para el acceso al carrito
  collection: string = 'Usuarios';
  collectionCarrito: string = 'Carrito';
  uuid = localStorage.getItem('uuid');

  cogerTodos() {
    try {
      return this.firestore
        .collection(this.collection)
        .doc(this.uuid!)
        .collection(this.collectionCarrito)
        .snapshotChanges();
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }

  AñadirFav() {
    try {
      return this.firestore
        .collection(this.collection)
        .doc(this.uuid!)
        .collection(this.collectionCarrito)
        .doc(this.uuid!);
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }

  docDir() {
    try {
      return this.firestore
        .collection(this.collection)
        .doc(this.uuid!)
        .collection(this.collectionCarrito)
        .doc(this.uuid!);
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
}
