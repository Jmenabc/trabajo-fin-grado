import { TestBed } from '@angular/core/testing';

import { AdministradorPageGuard } from './administrador-page.guard';

describe('AdministradorPageGuard', () => {
  let guard: AdministradorPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdministradorPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
