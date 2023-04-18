import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioCrudRoutingModule } from './usuario-crud-routing.module';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';


@NgModule({
  declarations: [
    ListaOpcionesComponent,
    VerUsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioCrudRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsuarioCrudModule { }
