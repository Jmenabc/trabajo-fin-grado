import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BotinesService } from 'src/app/services/botines/botines.service';
import { CamisetasService } from 'src/app/services/camisetas/camisetas.service';
import { PantalonesService } from 'src/app/services/pantalones.service';

@Component({
  selector: 'app-principal-menu-entrada',
  templateUrl: './principal-menu-entrada.component.html',
  styleUrls: ['./principal-menu-entrada.component.css'],
})
export class PrincipalMenuEntradaComponent {
  //Variables para almacenar los resultados de las listas
  coleccionCamisetas = 'Camisetas';
  coleccionPantalones = 'Pantalones';
  coleccionBotines = 'Botines';
  documentId: string = '';
  constructor(
    private afAuth: AngularFireAuth,
    private camisetasService: CamisetasService,
    private router: Router,
    private pantalonesService: PantalonesService,
    private botinesService: BotinesService
  ) {}

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      localStorage.clear();
      console.log(localStorage);
      this.router.navigate(['/login']);
    });
  }
}
