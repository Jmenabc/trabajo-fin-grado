import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoPermisosComponent } from './no-permisos.component';

describe('NoPermisosComponent', () => {
  let component: NoPermisosComponent;
  let fixture: ComponentFixture<NoPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoPermisosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
