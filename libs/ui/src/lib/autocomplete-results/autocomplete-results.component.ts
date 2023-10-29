import { Component, Input } from '@angular/core';
import { Movie, Person, TvShow } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-autocomplete-results',
  templateUrl: './autocomplete-results.component.html',
  styleUrls: ['./autocomplete-results.component.scss'],
})
export class AutocompleteResultsComponent {
  @Input() result!: Movie | TvShow | Person;
}
