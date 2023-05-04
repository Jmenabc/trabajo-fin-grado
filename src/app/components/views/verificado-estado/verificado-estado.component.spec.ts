import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificadoEstadoComponent } from './verificado-estado.component';

describe('VerificadoEstadoComponent', () => {
  let component: VerificadoEstadoComponent;
  let fixture: ComponentFixture<VerificadoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificadoEstadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificadoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
