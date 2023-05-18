import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionActivaComponent } from './confirmacion-activa.component';

describe('ConfirmacionActivaComponent', () => {
  let component: ConfirmacionActivaComponent;
  let fixture: ComponentFixture<ConfirmacionActivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmacionActivaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionActivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
