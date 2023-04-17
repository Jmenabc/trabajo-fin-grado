import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';

const routes: Routes = [
  { path: 'OpcionesUsuarios', component: ListaOpcionesComponent },
  { path: 'OpcionesUsuarios/VerUsuarios', component: VerUsuariosComponent },
  { path: 'OpcionesUsuarios/CrearUsuarios', component: CrearUsuariosComponent},
  { path: '**', redirectTo: 'OpcionesUsuarios', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioCrudRoutingModule {}
