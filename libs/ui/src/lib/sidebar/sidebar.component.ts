import { Component, Input } from '@angular/core';
import { Genre } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() darkMode!: boolean;
  @Input() genres!: Genre[];

  categories = [
    {
      id: 1,
      name: 'popular',
      value: 'popular',
    },
    {
      id: 2,
      name: 'top rated',
      value: 'top_rated',
    },
    {
      id: 3,
      name: 'upcoming',
      value: 'upcoming',
    },
  ];
}
