import { TestBed } from '@angular/core/testing';

import { PantalonesService } from './pantalones.service';

describe('PantalonesService', () => {
  let service: PantalonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PantalonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
