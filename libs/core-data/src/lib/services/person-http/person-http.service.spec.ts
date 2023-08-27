import { TestBed } from '@angular/core/testing';

import { PersonHttpService } from './person-http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('PersonHttpService', () => {
  let service: PersonHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PersonHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
