import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSelectorComponent } from './crud-selector.component';

describe('CrudSelectorComponent', () => {
  let component: CrudSelectorComponent;
  let fixture: ComponentFixture<CrudSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
