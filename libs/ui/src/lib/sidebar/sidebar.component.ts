import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Category, Genre, SelectedMedia } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(250),
      ]),
      transition('* => void', [
        animate(250, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnChanges {
  @Input() darkMode!: boolean;
  @Input() currentMedia!: SelectedMedia;
  @Input() genres!: Genre[];

  @Output() mediaSelected = new EventEmitter<SelectedMedia>();

  categories!: Category[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['currentMedia']) {
      this.setCategories();
    }
  }

  setCategories() {
    this.categories = [
      {
        id: 1,
        name: 'popular',
        value: 'popular',
      },
      {
        id: 2,
        name: 'trending',
        value: 'trending',
      },
      {
        id: 3,
        name: 'top rated',
        value: 'top_rated',
      },
      this.currentMedia === 'movie'
        ? {
            id: 4,
            name: 'upcoming',
            value: 'upcoming',
          }
        : {
            id: 4,
            name: 'On the Air',
            value: 'on_the_air',
          },
    ];
  }

  getMediaSelection(media: MatButtonToggleChange) {
    this.currentMedia = media.value;
    this.mediaSelected.emit(media.value as SelectedMedia);
  }
}
