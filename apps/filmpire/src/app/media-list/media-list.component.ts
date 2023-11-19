import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Movie, TvShow } from '@ng-filmpire/api-interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mediaListAction } from '../+state/media-list/media-list.actions';
import { MediaListPage } from '../+state/media-list/models/media-list.model';
import { selectMediaListPage } from '../+state/media-list/views/media-list-view.selectors';

@Component({
  selector: 'ng-filmpire-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaListComponent implements OnInit {
  @ViewChild('topOfPage') topOfPage!: ElementRef<HTMLDivElement>;

  mediaList$!: Observable<MediaListPage>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.mediaList$ = this.store.select(selectMediaListPage);
  }

  goToPage(page: PageEvent) {
    this.store.dispatch(
      mediaListAction.changePage({ page: page.pageIndex + 1 })
    );

    this.scrollToTop();
  }

  scrollToTop() {
    this.topOfPage?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  isMovie(media: Movie | TvShow): media is Movie {
    return (media as Movie).release_date !== undefined;
  }

  isTVShow(media: Movie | TvShow): media is TvShow {
    return (media as TvShow).first_air_date !== undefined;
  }
}
