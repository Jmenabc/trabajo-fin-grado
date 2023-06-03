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
/*
  Pagina que nos muestra los detalles del pantalon seleccionado
  @author Jmenabc
*/
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
    private ruta: ActivatedRoute,
    private cService: CarritoService,
    private router: Router,
    private log: LoggerService
  ) { }

  //Metodo que añade al log
  AnadirAlLog(data: string) {
    try {
      this.log.AñadirLog().update({
        data: firebase.firestore.FieldValue.arrayUnion({
          dato: `[${this.fecha}]:${data}`
        }),
      });
    } catch (error) {
      console.log('Error en la base de datos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  //Metodo que carga los detalles
  VerDetalles() {
    try {
      this.AnadirAlLog('Cargando detalles del producto');
      this.documentId = this.ruta.snapshot.paramMap.get('id')!;
      this.firebase
        .cogerUno(this.coleccion, this.documentId)
        .subscribe((resp: any) => {
          this.detalles.push(resp.payload.data());
          this.detF = this.detalles[0];
        });
      this.AnadirAlLog('Detalles cargados')
    } catch (error) {
      this.AnadirAlLog('Error al cargar detalles');
      this.router.navigate(['/errorBBDD']);
    }
  }

  //Metodo para añadir a favoritos
  Favoritos() {
    try {
      this.AnadirAlLog('Añadiendo a favoritos')
      this.cService.AñadirFav().update({
        productos: firebase.firestore.FieldValue.arrayUnion({
          nombre: this.detalles[0].nombre,
          marca: this.detalles[0].marca,
          precio: this.detalles[0].precio,
          cantidad: this.cantidad,
          url: this.detF.url
        }),
      });
      this.AnadirAlLog('Añadido a favoritos')
    } catch (error) {
      this.AnadirAlLog('Error al añadir a favoritos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.VerDetalles();
  }
}
