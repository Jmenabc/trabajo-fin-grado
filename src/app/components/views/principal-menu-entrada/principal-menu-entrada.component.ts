import { Component } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { format } from 'date-fns';
import { Router } from '@angular/router';
@Component({
  selector: 'app-principal-menu-entrada',
  templateUrl: './principal-menu-entrada.component.html',
  styleUrls: ['./principal-menu-entrada.component.css'],
})
export class PrincipalMenuEntradaComponent {

  constructor(private router: Router) {
    // Observar cambios en el localStorage
    window.addEventListener('storage', (event) => {
      if (event.key !== null) {
        // Si se modificó el localStorage, redirigir al inicio de sesión
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
    var hours = 1; 
    var now = new Date().getTime();
    var setupTime = localStorage.getItem('setupTime');

    if (setupTime == null) {
      localStorage.setItem('setupTime', now.toString());
    } else {
      if (now - parseInt(setupTime) > hours * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem('setupTime', now.toString());
      }
    }
  }
}
