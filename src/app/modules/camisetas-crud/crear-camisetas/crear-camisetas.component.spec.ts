import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCamisetasComponent } from './crear-camisetas.component';

describe('CrearCamisetasComponent', () => {
  let component: CrearCamisetasComponent;
  let fixture: ComponentFixture<CrearCamisetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCamisetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCamisetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
