import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDatosErrorComponent } from './base-datos-error.component';

describe('BaseDatosErrorComponent', () => {
  let component: BaseDatosErrorComponent;
  let fixture: ComponentFixture<BaseDatosErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDatosErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDatosErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
