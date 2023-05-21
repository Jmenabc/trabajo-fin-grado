import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPantalonesComponent } from './detalles-pantalones.component';

describe('DetallesPantalonesComponent', () => {
  let component: DetallesPantalonesComponent;
  let fixture: ComponentFixture<DetallesPantalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPantalonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPantalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
