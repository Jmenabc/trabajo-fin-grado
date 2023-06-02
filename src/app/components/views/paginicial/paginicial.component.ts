import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-paginicial',
  templateUrl: './paginicial.component.html',
  styleUrls: ['./paginicial.component.css']
})
/*
  Pagina de entrada a la web, iniciamos el AOS animation
  @author Jmenabc
*/
export class PaginicialComponent {

  //Iniciamos el componente de AOS para hacer uso de sus animaciones

  ngOnInit() {
    AOS.init();
  }

}
