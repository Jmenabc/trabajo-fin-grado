import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/views/login/login.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { RegistroComponent } from './components/views/registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { PaginicialComponent } from './components/views/paginicial/paginicial.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PrincipalMenuEntradaComponent } from './components/views/principal-menu-entrada/principal-menu-entrada.component';
import { BgImageComponent } from './components/bg-image/bg-image.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecuperarcComponent } from './components/views/recuperarc/recuperarc.component';
import { CrudSelectorComponent } from './components/views/crud-selector/crud-selector.component';
import { VerificadoEstadoComponent } from './components/views/verificado-estado/verificado-estado.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NoPermisosComponent } from './components/views/no-permisos/no-permisos.component';
import { ConfirmacionActivaComponent } from './components/confirmacion-activa/confirmacion-activa.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BaseDatosErrorComponent } from './components/views/base-datos-error/base-datos-error.component';
import { ListaBotinesComponent } from './components/views/lista-botines/lista-botines.component';
import { DetallesBotinesComponent } from './components/views/detalles-botines/detalles-botines.component';
import { ListaCamisetasComponent } from './components/views/lista-camisetas/lista-camisetas.component';
import { ListaPantalonesComponent } from './components/views/lista-pantalones/lista-pantalones.component';
import { DetallesCamisetasComponent } from './components/views/detalles-camisetas/detalles-camisetas.component';
import { DetallesPantalonesComponent } from './components/views/detalles-pantalones/detalles-pantalones.component';
import { PerfilComponent } from './components/views/perfil/perfil.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PaginicialComponent,
    NavBarComponent,
    PrincipalMenuEntradaComponent,
    BgImageComponent,
    RecuperarcComponent,
    CrudSelectorComponent,
    VerificadoEstadoComponent,
    CarritoComponent,
    NoPermisosComponent,
    ConfirmacionActivaComponent,
    BaseDatosErrorComponent,
    ListaBotinesComponent,
    DetallesBotinesComponent,
    ListaCamisetasComponent,
    ListaPantalonesComponent,
    DetallesCamisetasComponent,
    DetallesPantalonesComponent,
    PerfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NoopAnimationsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
