import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  collection: string = 'Usuarios';
  collectionCarrito: string = 'Carrito';
  constructor(private firestore: AngularFirestore, private router: Router) {}

  //Metodo para crear usuario
  CrearUsuario(data: any) {
    try {
      return this.firestore.collection(this.collection).add(data);
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
  //Metodo para crear un documento de la base de datos
  CrearRegistrar(data: any, uuid: string) {
    try {
      return this.firestore.collection(this.collection).doc(uuid).set(data);
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }

  //Metodo que cuando te registres se cree un carrito de la compra para tu usuario
  CrearCarrito(uuid: string) {
    try {
      return this.firestore
        .collection(this.collection)
        .doc(uuid)
        .collection(this.collectionCarrito)
        .doc(uuid)
        .set({
          carrito: [],
        });
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
}
