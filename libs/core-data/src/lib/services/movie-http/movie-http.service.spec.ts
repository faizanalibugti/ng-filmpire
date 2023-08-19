import { TestBed } from '@angular/core/testing';

import { MovieHttpService } from './movie-http.service';

describe('MovieHttpService', () => {
  let service: MovieHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
