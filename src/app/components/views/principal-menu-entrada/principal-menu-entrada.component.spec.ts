import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalMenuEntradaComponent } from './principal-menu-entrada.component';

describe('PrincipalMenuEntradaComponent', () => {
  let component: PrincipalMenuEntradaComponent;
  let fixture: ComponentFixture<PrincipalMenuEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalMenuEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalMenuEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
