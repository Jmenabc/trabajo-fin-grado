import { collection } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
/*
  Servicio que contiene mis metodos (Logger) a la base de datos
  @author Jmenabc
*/
export class LoggerService {
  collection: string = 'Log';
  constructor(private firestore: AngularFirestore) {}

  AñadirLog() {
    return this.firestore.collection(this.collection).doc("Log");
  }
}
