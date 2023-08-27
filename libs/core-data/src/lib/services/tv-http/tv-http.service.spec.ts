import { TestBed } from '@angular/core/testing';

import { TvHttpService } from './tv-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TvHttpService', () => {
  let service: TvHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TvHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
