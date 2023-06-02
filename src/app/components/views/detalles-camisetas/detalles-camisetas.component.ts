import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionActivaComponent } from 'src/app/components/confirmacion-activa/confirmacion-activa.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalles-camisetas',
  templateUrl: './detalles-camisetas.component.html',
  styleUrls: ['./detalles-camisetas.component.css'],
})
export class DetallesCamisetasComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Camisetas';
  documentId: string = '';
  usuario: any;
  detalles: any[] = [];
  detF: any;
  cantidad: number = 0;
  rol = localStorage.getItem("rol");
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  constructor(
    private firebase: CamisetasService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private cService: CarritoService,
    private _location: Location,
    private modalService: NgbModal,
    private router: Router,
    private log: LoggerService
  ) {}


  //Metodo que añade al log
  AnadirAlLog(data:string) {
    console.log(data);
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato:`[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }
  VerDetalles() {
    try {
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.detalles.push(resp.payload.data());
          this.detF = this.detalles[0];
        });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  Favoritos() {
    try {
      this.cService.AñadirFav().update({
        productos: firebase.firestore.FieldValue.arrayUnion({
          nombre: this.detalles[0].nombre,
          marca: this.detalles[0].marca,
          precio: this.detalles[0].precio,
          cantidad: this.cantidad,
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.VerDetalles();
  }
}
