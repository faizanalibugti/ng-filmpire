import { TestBed } from '@angular/core/testing';

import { GenreHttpService } from './genre-http.service';

describe('GenreHttpService', () => {
  let service: GenreHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenreHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
