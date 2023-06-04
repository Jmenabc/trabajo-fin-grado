import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfg';
  constructor(private router: Router) {
    // Observar cambios en el localStorage
    window.addEventListener('storage', (event) => {
      if (event.key !== null) {
        // Si se modificó el localStorage, redirigir al inicio de sesión
        this.router.navigate(['/desconectado']);
      }
    });
  }
}
