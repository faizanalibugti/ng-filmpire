import { TestBed } from '@angular/core/testing';

import { MovieHttpService } from './movie-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieHttpService', () => {
  let service: MovieHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MovieHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
