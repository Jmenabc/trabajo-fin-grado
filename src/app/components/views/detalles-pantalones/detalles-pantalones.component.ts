import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PantalonesService } from 'src/app/services/pantalones.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';


@Component({
  selector: 'app-detalles-pantalones',
  templateUrl: './detalles-pantalones.component.html',
  styleUrls: ['./detalles-pantalones.component.css'],
})
export class DetallesPantalonesComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Pantalones';
  documentId: string = '';
  usuario: any;
  detalles: any[] = [];
  detF: any;
  cantidad: number = 0;
  rol = localStorage.getItem("rol");
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  constructor(
    private firebase: PantalonesService,
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private cService: CarritoService,
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
