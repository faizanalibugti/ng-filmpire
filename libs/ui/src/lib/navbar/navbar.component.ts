import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseEntity, SearchResults } from '@ng-filmpire/api-interfaces';
import { SearchHttpService } from '@ng-filmpire/core-data';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'ng-filmpire-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @Input() darkMode!: boolean;

  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() toggleMobileSidenav = new EventEmitter<void>();

  searchForm!: FormGroup;
  searchValueChanges$!: Observable<BaseEntity<SearchResults>> | undefined;

  constructor(private fb: FormBuilder, private searchHttp: SearchHttpService) {}

  ngOnInit(): void {
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      search: this.fb.control(null),
    });

    this.searchValueChanges$ = this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(300),
      map((query: string) => query.trim()),
      distinctUntilChanged(),
      filter((query: string) => query !== null),
      switchMap((query: string) => this.searchHttp.getMultiSearchResults(query))
    );
  }

  searchMovie() {
    this.searchForm.get('search')?.value;
    this.searchForm.reset();
  }

  resetSearchBar() {
    this.searchForm.reset();
  }
}
