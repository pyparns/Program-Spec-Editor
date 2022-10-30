import { TestBed } from '@angular/core/testing';

import { SystemAnalystService } from './system-analyst.service';

describe('SystemAnalystService', () => {
  let service: SystemAnalystService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAnalystService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
