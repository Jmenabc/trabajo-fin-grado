import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCamisetasComponent } from './editar-camisetas.component';

describe('EditarCamisetasComponent', () => {
  let component: EditarCamisetasComponent;
  let fixture: ComponentFixture<EditarCamisetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCamisetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCamisetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
