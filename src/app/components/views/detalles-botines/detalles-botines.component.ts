import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { Location } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';


@Component({
  selector: 'app-detalles-botines',
  templateUrl: './detalles-botines.component.html',
  styleUrls: ['./detalles-botines.component.css'],
})
/*
  Pagina que nos muestra los detalles del botin seleccionado
  @author Jmenabc
*/
export class DetallesBotinesComponent {
  //Declaramos la coleccion de firebase, id, y el objeto en los que vamos a trabajar
  coleccion: string = 'Botines';
  documentId: string = '';
  usuario: any;
  detalles: any[] = [];
  detF: any;
  cantidad: number = 0;
  rol = localStorage.getItem("rol");
  fecha: any = format(new Date(), 'dd/MM/yyyy');

  constructor(
    private firebase: BotinesService,
    private ruta: ActivatedRoute,
    private router: Router,
    private cService: CarritoService,
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
      this.AnadirAlLog('Error en la base de datos');
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
      if (firebase.auth().currentUser) {
        this.AnadirAlLog('Añadiendo a favoritos')
        this.cService.AñadirFav().update({
          productos: firebase.firestore.FieldValue.arrayUnion({
            nombre: this.detF.nombre,
            marca: this.detF.marca,
            precio: this.detF.precio,
            cantidad: this.cantidad
          }),
        });
        this.AnadirAlLog('Añadido a favoritos')
      }
      this.AnadirAlLog('No tiene permisos')
    } catch (error) {
      this.AnadirAlLog('Error al añadir a favoritos');
      this.router.navigate(['/errorBBDD']);
    }
  }

  ngOnInit() {
    this.VerDetalles();
  }
}
