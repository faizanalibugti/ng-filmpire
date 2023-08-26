import { TestBed } from '@angular/core/testing';

import { SearchHttpService } from './search-http.service';

describe('SearchHttpService', () => {
  let service: SearchHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
