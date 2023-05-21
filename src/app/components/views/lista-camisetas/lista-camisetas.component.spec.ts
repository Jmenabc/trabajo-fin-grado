import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCamisetasComponent } from './lista-camisetas.component';

describe('ListaCamisetasComponent', () => {
  let component: ListaCamisetasComponent;
  let fixture: ComponentFixture<ListaCamisetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCamisetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCamisetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
