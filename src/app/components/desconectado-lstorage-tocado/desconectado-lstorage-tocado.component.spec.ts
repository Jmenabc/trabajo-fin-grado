import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesconectadoLstorageTocadoComponent } from './desconectado-lstorage-tocado.component';

describe('DesconectadoLstorageTocadoComponent', () => {
  let component: DesconectadoLstorageTocadoComponent;
  let fixture: ComponentFixture<DesconectadoLstorageTocadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesconectadoLstorageTocadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesconectadoLstorageTocadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
