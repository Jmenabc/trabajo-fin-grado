import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  collection: string = "Usuarios"
  collectionCarrito: string = "Carrito"
  constructor(private firestore: AngularFirestore) { }

  //Metodo para crear usuario
  CrearUsuario(data: any) {
    return this.firestore.collection(this.collection).add(data);
  }
  //Metodo para crear un documento de la base de datos
  CrearRegistrar( data: any,uuid: string) {
    return this.firestore.collection(this.collection).doc(uuid).set(data);
  }

  //Metodo que cuando te registres se cree un carrito de la compra para tu usuario
  CrearCarrito(uuid: string) {
    return this.firestore.collection(this.collection).doc(uuid).collection(this.collectionCarrito).doc(uuid).set({
      "carrito": []
    });
  }
}
