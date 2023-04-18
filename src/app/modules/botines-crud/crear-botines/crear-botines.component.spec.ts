import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearBotinesComponent } from './crear-botines.component';

describe('CrearBotinesComponent', () => {
  let component: CrearBotinesComponent;
  let fixture: ComponentFixture<CrearBotinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearBotinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearBotinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
