import { Component } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-paginicial',
  templateUrl: './paginicial.component.html',
  styleUrls: ['./paginicial.component.css']
})
export class PaginicialComponent {

  //Iniciamos el componente de AOS para hacer uso de sus animaciones

  ngOnInit() {
    AOS.init();
  }

}
