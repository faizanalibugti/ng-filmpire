import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileData } from '@ng-filmpire/api-interfaces';
import { AccountService, AuthService } from '@ng-filmpire/core-data';
import { Observable, filter, map, concatMap, forkJoin } from 'rxjs';

@Component({
  selector: 'ng-filmpire-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  profileData$!: Observable<ProfileData>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountHttp: AccountService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.profileData$ = this.route.params.pipe(
      filter(({ id }) => !!id),
      map(({ id }) => Number(id)),
      concatMap((id) =>
        forkJoin({
          favoriteMovies: this.accountHttp.getFavoriteMovies(id),
          favoriteTV: this.accountHttp.getFavouriteTV(id),
          watchListMovies: this.accountHttp.getWatchListMovies(id),
          watchListTV: this.accountHttp.getWatchListTV(id),
        })
      )
    );
  }

  logout() {
    this.auth.logOut();
    this.router.navigate(['/']);
  }
}
