import { TestBed } from '@angular/core/testing';

import { SearchHttpService } from './search-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SearchHttpService', () => {
  let service: SearchHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
