import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
/*
  Servicio que contiene mis metodos (Recibos) a la base de datos
  @author Jmenabc
*/
export class RecibosService {
  collection: string = 'Recibos';
  uuid = localStorage.getItem('uuid');
  constructor(private firestore: AngularFirestore, private router: Router) {}

  //Metodo que cuando te registres se cree un carrito de la compra para tu usuario
  Crear(coleccion: string, data: any) {
    return this.firestore.collection(coleccion).add(data);
  }
  CrearRecibo(uuid: any) {
    return this.firestore.collection(this.collection).doc(uuid).set({
      recibo: [],
    });
  }
  //Metodo para recoger la ubicacion del documento
  docDir() {
    return this.firestore.collection(this.collection).doc();
  }
}
