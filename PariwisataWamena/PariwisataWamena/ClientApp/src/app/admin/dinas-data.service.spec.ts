import { TestBed } from '@angular/core/testing';

import { DinasDataService } from './dinas-data.service';

describe('DinasDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DinasDataService = TestBed.get(DinasDataService);
    expect(service).toBeTruthy();
  });
});
