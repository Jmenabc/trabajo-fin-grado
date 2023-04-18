import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerBotinesComponent } from './ver-botines.component';

describe('VerBotinesComponent', () => {
  let component: VerBotinesComponent;
  let fixture: ComponentFixture<VerBotinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerBotinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerBotinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
