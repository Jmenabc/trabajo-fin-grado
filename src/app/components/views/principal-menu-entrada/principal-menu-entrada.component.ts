import { Component } from '@angular/core';
import { LoggerService } from 'src/app/services/logger/logger.service';

@Component({
  selector: 'app-principal-menu-entrada',
  templateUrl: './principal-menu-entrada.component.html',
  styleUrls: ['./principal-menu-entrada.component.css'],
})
export class PrincipalMenuEntradaComponent {
  constructor(private loggerService: LoggerService) {}

}
