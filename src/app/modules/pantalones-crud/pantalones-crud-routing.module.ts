import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { VerPantalonComponent } from './ver-pantalon/ver-pantalon.component';
import { CrearPantalonComponent } from './crear-pantalon/crear-pantalon.component';
import { EditarPantalonComponent } from './editar-pantalon/editar-pantalon.component';

const routes: Routes = [
  { path: 'pantalones', component: ListaOpcionesComponent },
  { path: 'pantalones/VerPantalones', component: VerPantalonComponent },
  { path: 'pantalones/CrearPantalones', component: CrearPantalonComponent },
  { path: 'pantalones/VerPantalones/EditarPantalones/:id', component: EditarPantalonComponent},
  { path: '**', redirectTo: 'pantalones', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantalonesCrudRoutingModule { }
