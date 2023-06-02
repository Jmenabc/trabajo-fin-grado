import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PantalonesCrudRoutingModule } from './pantalones-crud-routing.module';
import { CrearPantalonComponent } from './crear-pantalon/crear-pantalon.component';
import { EditarPantalonComponent } from './editar-pantalon/editar-pantalon.component';
import { VerPantalonComponent } from './ver-pantalon/ver-pantalon.component';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearPantalonComponent,
    EditarPantalonComponent,
    VerPantalonComponent,
    ListaOpcionesComponent
  ],
  imports: [
    CommonModule,
    PantalonesCrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PantalonesCrudModule { }
