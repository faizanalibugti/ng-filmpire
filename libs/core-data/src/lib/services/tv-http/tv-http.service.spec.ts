import { TestBed } from '@angular/core/testing';

import { TvHttpService } from './tv-http.service';

describe('TvHttpService', () => {
  let service: TvHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
