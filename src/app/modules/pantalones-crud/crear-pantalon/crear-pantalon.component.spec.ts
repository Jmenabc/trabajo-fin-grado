import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPantalonComponent } from './crear-pantalon.component';

describe('CrearPantalonComponent', () => {
  let component: CrearPantalonComponent;
  let fixture: ComponentFixture<CrearPantalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPantalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPantalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
