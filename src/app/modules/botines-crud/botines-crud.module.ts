import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BotinesCrudRoutingModule } from './botines-crud-routing.module';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { VerBotinesComponent } from './ver-botines/ver-botines.component';
import { CrearBotinesComponent } from './crear-botines/crear-botines.component';
import { EditarBotinesComponent } from './editar-botines/editar-botines.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaOpcionesComponent,
    VerBotinesComponent,
    CrearBotinesComponent,
    EditarBotinesComponent
  ],
  imports: [
    CommonModule,
    BotinesCrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BotinesCrudModule { }
