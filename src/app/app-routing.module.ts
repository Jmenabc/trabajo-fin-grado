import { LoginComponent } from './components/views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './components/views/registro/registro.component';
import { PaginicialComponent } from './components/views/paginicial/paginicial.component';
import { PrincipalMenuEntradaComponent } from './components/views/principal-menu-entrada/principal-menu-entrada.component';
import { RecuperarcComponent } from './components/views/recuperarc/recuperarc.component';
import { CrudSelectorComponent } from './components/views/crud-selector/crud-selector.component';
import { VerificadoEstadoComponent } from './components/views/verificado-estado/verificado-estado.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdministradorPageGuard } from './guards/administrador-pagina/administrador-page.guard';
import { NoPermisosComponent } from './components/views/no-permisos/no-permisos.component';
import { BaseDatosErrorComponent } from './components/views/base-datos-error/base-datos-error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'Inicio', component: PaginicialComponent },
  { path: 'Menu', component: PrincipalMenuEntradaComponent },
  { path: 'recuperarContraseña', component: RecuperarcComponent },
  {
    path: 'crudselector',
    component: CrudSelectorComponent,
    canActivate: [AdministradorPageGuard],
  },
  { path: 'verificado', component: VerificadoEstadoComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'noPermisos', component: NoPermisosComponent },
  { path: 'errorBBDD', component: BaseDatosErrorComponent },
  //Modules
  {
    path: 'usuarioCRUD',
    canActivate: [AdministradorPageGuard],
    loadChildren: () =>
      import('./modules/usuario-crud/usuario-crud.module').then(
        (m) => m.UsuarioCrudModule
      ),
  },
  {
    path: 'botinesCRUD',
    canActivate: [AdministradorPageGuard],
    loadChildren: () =>
      import('./modules/botines-crud/botines-crud.module').then(
        (m) => m.BotinesCrudModule
      ),
  },
  {
    path: 'pantalonesCRUD',
    canActivate: [AdministradorPageGuard],
    loadChildren: () =>
      import('./modules/pantalones-crud/pantalones-crud.module').then(
        (m) => m.PantalonesCrudModule
      ),
  },
  {
    path: 'camisetasCRUD',
    canActivate: [AdministradorPageGuard],
    loadChildren: () =>
      import('./modules/camisetas-crud/camisetas-crud.module').then(
        (m) => m.CamisetasCrudModule
      ),
  },

  //Pagina de inicio
  { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
