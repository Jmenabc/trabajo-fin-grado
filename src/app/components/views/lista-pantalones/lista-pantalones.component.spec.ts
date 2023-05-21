import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPantalonesComponent } from './lista-pantalones.component';

describe('ListaPantalonesComponent', () => {
  let component: ListaPantalonesComponent;
  let fixture: ComponentFixture<ListaPantalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPantalonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPantalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
