import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecibosService {
  collection: string = "Recibos";
  uuid = localStorage.getItem('uuid');
  constructor(private firestore: AngularFirestore) { }

  //Metodo que cuando te registres se cree un carrito de la compra para tu usuario
  CrearRecibo(uuid: any) {
    return this.firestore.collection(this.collection).doc(uuid).set({
      "recibo": []
    });
  }
  //Metodo para recoger la ubicacion del documento
  docDir() {
    return this.firestore
      .collection(this.collection)
      .doc(this.uuid!)
  }
}
