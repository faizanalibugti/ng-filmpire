import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseEntity, SearchResults, User } from '@ng-filmpire/api-interfaces';
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
  @Input() user!: User | null;

  @Output() toggleDarkMode = new EventEmitter<void>();
  @Output() toggleMobileSidenav = new EventEmitter<void>();
  @Output() logIn = new EventEmitter<void>();

  searchForm!: FormGroup;
  searchValueChanges$!: Observable<BaseEntity<SearchResults>> | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchHttp: SearchHttpService
  ) {}

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
      filter((query: string) => !!query),
      distinctUntilChanged(),
      switchMap((query: string) => this.searchHttp.getMultiSearchResults(query))
    );
  }

  authenticateUser() {
    this.logIn.emit();
  }

  resetSearchBar() {
    this.searchForm.reset();
  }

  navigateToMediaDetails(media: SearchResults) {
    switch (media.media_type) {
      case 'movie':
        this.router.navigate(['/movie', media.id]);
        break;
      case 'tv':
        this.router.navigate(['/tv', media.id]);
        break;
      case 'person':
        this.router.navigate(['/actor', media.id]);
        break;
      default:
        break;
    }
  }
}
