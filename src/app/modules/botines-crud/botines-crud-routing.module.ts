import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaOpcionesComponent } from './lista-opciones/lista-opciones.component';
import { CrearBotinesComponent } from './crear-botines/crear-botines.component';
import { VerBotinesComponent } from './ver-botines/ver-botines.component';

const routes: Routes = [
  { path: 'botines', component: ListaOpcionesComponent },
  { path: 'botines/VerBotines', component: VerBotinesComponent },
  { path: 'botines/CrearBotines', component: CrearBotinesComponent },
  { path: '**', redirectTo: 'botines', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotinesCrudRoutingModule {}
