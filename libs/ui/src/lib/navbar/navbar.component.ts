import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthToken,
  BaseEntity,
  SearchResults,
  User,
} from '@ng-filmpire/api-interfaces';
import { AuthService, SearchHttpService } from '@ng-filmpire/core-data';
import {
  Observable,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
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
  authToken$!: Observable<AuthToken>;
  userDetails$!: Observable<User>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private searchHttp: SearchHttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildSearchForm();

    this.userDetails$ = this.route.queryParams.pipe(
      filter(({ approved }) => approved === 'true'),
      concatMap(() =>
        forkJoin([
          this.authService.createSessionId(),
          this.authService.getUserDetails(),
        ])
      ),
      map(([, { ...user }]) => user as User)
    );
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

  authenticateUser() {
    this.authToken$ = this.authService.createRequestToken();
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
