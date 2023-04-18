import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarBotinesComponent } from './editar-botines.component';

describe('EditarBotinesComponent', () => {
  let component: EditarBotinesComponent;
  let fixture: ComponentFixture<EditarBotinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarBotinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarBotinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
