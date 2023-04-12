import { LoginComponent } from './components/views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/views/registro/registro.component';
import { PaginicialComponent } from './components/views/paginicial/paginicial.component';
import { PrincipalMenuEntradaComponent } from './components/views/principal-menu-entrada/principal-menu-entrada.component';
import { RecuperarcComponent } from './components/views/recuperarc/recuperarc.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'Inicio', component: PaginicialComponent },
  { path: 'Menu', component: PrincipalMenuEntradaComponent },
  {path: 'recuperarContraseña',component: RecuperarcComponent},
  { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
