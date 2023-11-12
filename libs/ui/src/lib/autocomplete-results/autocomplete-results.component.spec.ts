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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
