import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { RecibosService } from 'src/app/services/recibos/recibos.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  constructor(
    private cService: CarritoService,
    private rService: RecibosService
  ) {}

  //Requisitos para llamar a la coleccion y pasar los datos a la vista
  carritoLista: any[] = [];
  documentId: string = '';
  datosCarrito: any[] = [];
  suma: number = 0;
  //Recogemos todos los productos de nuestro map productos
  get() {
    this.cService.cogerTodos().subscribe((resp: any) => {
      this.carritoLista = [];
      resp.forEach((carritoSnapshot: any) => {
        this.carritoLista.push({
          ...carritoSnapshot.payload.doc.data(),
        });
        this.datosCarrito = this.carritoLista[0].productos;
        console.log(this.datosCarrito = this.carritoLista[0].productos);
        //Ahora recogemos el precio de todos los obejtos de la lista y los sumamos
        this.datosCarrito.forEach((objeto) => {
          this.suma += objeto.precio;
          console.log(this.suma);
        });
      });
    });


  }

  sumar() {
    alert('Pagado con exito');
    const data = {
      miLista: this.datosCarrito
    };
    //Una vez sabemos que los datos del carrito estan en datosCarrito los añadimos a un recibo y lo generamos en la base de datos
    this.rService.Crear("Recibos",data);
    //Despues de haberlos generado en la base de datos generamos un pdf con los datos que queremos
    this.rService.CrearRecibo(localStorage.getItem('uuid')!.toString());
    this.cService
      .docDir()
      .update({
        productos: [],
      })
      .then(() => {
        console.log(
          'Objetos de la lista de productos eliminados correctamente'
        );
      })
      .catch((error) => {
        console.error('Error eliminando los productos de la lista: ', error);
      });
    this.suma = 0;
  }

  ngOnInit() {
    this.get();
  }
}
