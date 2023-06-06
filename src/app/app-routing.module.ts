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
import { ListaBotinesComponent } from './components/views/lista-botines/lista-botines.component';
import { DetallesBotinesComponent } from './components/views/detalles-botines/detalles-botines.component';
import { ListaCamisetasComponent } from './components/views/lista-camisetas/lista-camisetas.component';
import { ListaPantalonesComponent } from './components/views/lista-pantalones/lista-pantalones.component';
import { DetallesCamisetasComponent } from './components/views/detalles-camisetas/detalles-camisetas.component';
import { DetallesPantalonesComponent } from './components/views/detalles-pantalones/detalles-pantalones.component';
import { PerfilComponent } from './components/views/perfil/perfil.component';
import { DesconectadoLstorageTocadoComponent } from './components/desconectado-lstorage-tocado/desconectado-lstorage-tocado.component';
import { CarritoGuard } from './guards/carrito/carrito.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'desconectado', component: DesconectadoLstorageTocadoComponent },
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
  { path: 'carrito', canActivate: [CarritoGuard], component: CarritoComponent },
  { path: 'noPermisos', component: NoPermisosComponent },
  { path: 'errorBBDD', component: BaseDatosErrorComponent },
  { path: 'perfil', component: PerfilComponent },
  //Listas de la ropa cliente
  { path: 'ListaBotines', component: ListaBotinesComponent },
  { path: 'DetallesBotines/:id', component: DetallesBotinesComponent },
  { path: 'ListaCamisetas', component: ListaCamisetasComponent },
  { path: 'DetallesCamisetas/:id', component: DetallesCamisetasComponent },
  { path: 'ListaPantalones', component: ListaPantalonesComponent },
  { path: 'DetallesPantalones/:id', component: DetallesPantalonesComponent },
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
export class AppRoutingModule { }
