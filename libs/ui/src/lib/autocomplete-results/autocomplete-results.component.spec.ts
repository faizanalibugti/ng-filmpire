import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteResultsComponent } from './autocomplete-results.component';

describe('AutocompleteResultsComponent', () => {
  let component: AutocompleteResultsComponent;
  let fixture: ComponentFixture<AutocompleteResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
