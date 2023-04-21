import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { VerCamisetasComponent } from './ver-camisetas/ver-camisetas.component';
import { CrearCamisetasComponent } from './crear-camisetas/crear-camisetas.component';
import { EditarCamisetasComponent } from './editar-camisetas/editar-camisetas.component';

const routes: Routes = [
  { path: 'camisetas', component: ListaOpcionesComponent },
  { path: 'camisetas/VerCamisetas', component: VerCamisetasComponent },
  { path: 'camisetas/CrearCamisetas', component: CrearCamisetasComponent },
  { path: 'camisetas/VerCamisetas/EditarCamiseta/:id', component: EditarCamisetasComponent},
  { path: '**', redirectTo: 'camisetas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamisetasCrudRoutingModule { }
