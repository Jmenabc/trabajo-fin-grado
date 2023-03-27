import { TestBed } from '@angular/core/testing';

import { BotinesService } from './botines.service';

describe('BotinesService', () => {
  let service: BotinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
