import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildSearchForm();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      search: this.fb.control(null),
    });
  }

  searchMovie() {
    this.searchForm.get('search')?.value;
    this.searchForm.reset();
  }

  resetSearchBar() {
    this.searchForm.reset();
  }
}
