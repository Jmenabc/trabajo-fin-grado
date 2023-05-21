import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesBotinesComponent } from './detalles-botines.component';

describe('DetallesBotinesComponent', () => {
  let component: DetallesBotinesComponent;
  let fixture: ComponentFixture<DetallesBotinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesBotinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesBotinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
