import { TestBed } from '@angular/core/testing';

import { VerificarEstadoCorreoGuard } from './verificar-estado-correo.guard';

describe('VerificarEstadoCorreoGuard', () => {
  let guard: VerificarEstadoCorreoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerificarEstadoCorreoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
