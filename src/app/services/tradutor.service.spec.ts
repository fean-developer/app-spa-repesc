import { TestBed } from '@angular/core/testing';

import { TradutorService } from './tradutor.service';

describe('TradutorService', () => {
  let service: TradutorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradutorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
