import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { Location } from '@angular/common';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


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
  cantidad: string = "1";
  rol = localStorage.getItem("rol");
  fecha: any = format(new Date(), 'dd/MM/yyyy');
  anadido: string = "";
  constructor(
    private firebase: BotinesService,
    private ruta: ActivatedRoute,
    private router: Router,
    private cService: CarritoService,
    private log: LoggerService,
    private fb: FormBuilder
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
    this.AnadirAlLog('Cargando detalles del producto');
    this.documentId = this.ruta.snapshot.paramMap.get('id')!;
    this.firebase
      .cogerUno(this.coleccion, this.documentId)
      .subscribe((resp: any) => {
        this.detalles.push(resp.payload.data());
        this.detF = this.detalles[0];
      });
    this.AnadirAlLog('Detalles cargados')

  }
  //Metodo para añadir a favoritos
  Favoritos() {
    this.AnadirAlLog('Añadiendo a favoritos');

    if (this.cantidad === undefined || this.cantidad.trim() === '') {
      this.anadido = "El campo no puede estar vacío";
      return;
    }

    this.cService.AñadirFav().update({
      productos: firebase.firestore.FieldValue.arrayUnion({
        nombre: this.detF.nombre,
        marca: this.detF.marca,
        precio: this.detF.precio,
        cantidad: this.cantidad,
        url: this.detF.url
      }),
    });

    this.AnadirAlLog('Añadido a favoritos');
    this.anadido = "Añadido con éxito al carrito";
  }


  ngOnInit() {
    this.VerDetalles();
  }
}
