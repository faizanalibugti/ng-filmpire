import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[ngFilmpireTheme]',
})
export class ThemeDirective implements OnChanges {
  @Input() darkTheme!: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['darkTheme']) {
      if (this.darkTheme) {
        this.renderer.addClass(this.document.body, 'dark');
      } else {
        this.renderer.removeClass(this.document.body, 'dark');
      }
    }
  }
}
