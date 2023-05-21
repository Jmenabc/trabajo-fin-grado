import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBotinesComponent } from './lista-botines.component';

describe('ListaBotinesComponent', () => {
  let component: ListaBotinesComponent;
  let fixture: ComponentFixture<ListaBotinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBotinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBotinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
