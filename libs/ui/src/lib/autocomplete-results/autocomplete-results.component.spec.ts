import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteResultsComponent } from './autocomplete-results.component';
import { MaterialModule } from '@ng-filmpire/material';

describe('AutocompleteResultsComponent', () => {
  let component: AutocompleteResultsComponent;
  let fixture: ComponentFixture<AutocompleteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [AutocompleteResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteResultsComponent);
    component = fixture.componentInstance;
    component.result = {
      adult: false,
      backdrop_path: '/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
      id: 872585,
      title: 'Oppenheimer',
      original_language: 'en',
      original_title: 'Oppenheimer',
      overview:
        'The story of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.',
      poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      media_type: 'movie',
      genre_ids: [18, 36],
      popularity: 704.491,
      release_date: new Date('2023-07-19'),
      video: false,
      vote_average: 8.241,
      vote_count: 4124,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
