import { TestBed } from '@angular/core/testing';

import { RepescsService } from './repescs.service';

describe('RepescsService', () => {
  let service: RepescsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepescsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
