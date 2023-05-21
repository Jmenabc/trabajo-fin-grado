import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCamisetasComponent } from './detalles-camisetas.component';

describe('DetallesCamisetasComponent', () => {
  let component: DetallesCamisetasComponent;
  let fixture: ComponentFixture<DetallesCamisetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesCamisetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCamisetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
