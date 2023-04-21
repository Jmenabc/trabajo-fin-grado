import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPantalonComponent } from './editar-pantalon.component';

describe('EditarPantalonComponent', () => {
  let component: EditarPantalonComponent;
  let fixture: ComponentFixture<EditarPantalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPantalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPantalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
