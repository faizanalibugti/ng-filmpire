import { TestBed } from '@angular/core/testing';

import { GenreHttpService } from './genre-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GenreHttpService', () => {
  let service: GenreHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GenreHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
