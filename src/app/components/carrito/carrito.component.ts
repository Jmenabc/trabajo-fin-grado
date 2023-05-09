import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(private cService: CarritoService) {}

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
        //Ahora recogemos el precio de todos los obejtos de la lista y los sumamos
        this.datosCarrito.forEach((objeto) => {
          this.suma += objeto.precio
          console.log(this.suma)
        })
      });
    });
  }

  sumar() {
    alert("Pagado con exito")
    this.cService.cogerTodos().subscribe((resp: any) => {
      resp.forEach((carritoSnapshot: any) => {
        console.log(carritoSnapshot)
      });
    });
  }

  ngOnInit() {
    this.get();
  }

}
