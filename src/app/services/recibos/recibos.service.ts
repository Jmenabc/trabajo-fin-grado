import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RecibosService {
  collection: string = 'Recibo ';
  uuid = localStorage.getItem('uuid');
  constructor(private firestore: AngularFirestore, private router: Router) {}

  //Metodo que cuando te registres se cree un carrito de la compra para tu usuario
  Crear(coleccion: string, data: any) {
    try {
      return this.firestore.collection(coleccion).add(data);
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
  CrearRecibo(uuid: any) {
    try {
      return this.firestore.collection(this.collection).doc(uuid).set({
        recibo: [],
      });
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
  //Metodo para recoger la ubicacion del documento
  docDir() {
    try {
      return this.firestore.collection(this.collection).doc();
    } catch (error) {
      console.log('Se ha producido un error de conexión con la base de datos');
      //Redireccionar a la ventana de no hay conexión
      return this.router.navigate(['/errorbbdd']);
    }
  }
}
