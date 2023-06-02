import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamisetasCrudRoutingModule } from './camisetas-crud-routing.module';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { CrearCamisetasComponent } from './crear-camisetas/crear-camisetas.component';
import { VerCamisetasComponent } from './ver-camisetas/ver-camisetas.component';
import { EditarCamisetasComponent } from './editar-camisetas/editar-camisetas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListaOpcionesComponent,
    CrearCamisetasComponent,
    VerCamisetasComponent,
    EditarCamisetasComponent,

  ],
  imports: [
    CommonModule,
    CamisetasCrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CamisetasCrudModule { }
