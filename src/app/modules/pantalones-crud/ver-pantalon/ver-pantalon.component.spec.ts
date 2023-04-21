import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPantalonComponent } from './ver-pantalon.component';

describe('VerPantalonComponent', () => {
  let component: VerPantalonComponent;
  let fixture: ComponentFixture<VerPantalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPantalonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerPantalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
