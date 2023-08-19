import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-filmpire-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() darkMode!: boolean;

  categories = [
    {
      title: 'popular',
    },
    {
      title: 'top rated',
    },
    {
      title: 'upcoming',
    },
  ];

  genres = [
    {
      title: 'action',
    },
    {
      title: 'adventure',
    },
    {
      title: 'animation',
    },
    {
      title: 'comedy',
    },
    {
      title: 'crime',
    },
    {
      title: 'documentary',
    },
    {
      title: 'drama',
    },
    {
      title: 'family',
    },
    {
      title: 'fantasy',
    },
    {
      title: 'history',
    },
    {
      title: 'horror',
    },
    {
      title: 'music',
    },
    {
      title: 'mystery',
    },
    {
      title: 'romance',
    },
    {
      title: 'science fiction',
    },
    {
      title: 'tv movie',
    },
    {
      title: 'thriller',
    },
    {
      title: 'war',
    },
    {
      title: 'western',
    },
  ];
}
