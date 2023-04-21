import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCamisetasComponent } from './ver-camisetas.component';

describe('VerCamisetasComponent', () => {
  let component: VerCamisetasComponent;
  let fixture: ComponentFixture<VerCamisetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCamisetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCamisetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
