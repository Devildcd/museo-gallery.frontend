import { TestBed } from '@angular/core/testing';

import { MuseoService } from './museo.service';

describe('MuseoService', () => {
  let service: MuseoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MuseoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
