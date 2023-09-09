import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntersectionObserverDirective } from './directives/intersection-observer/intersection-observer.directive';
import { ThemeDirective } from './directives/theme/theme.directive';
import { AbbreviateNumberPipe } from './pipes/abbreviate-number.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [IntersectionObserverDirective, ThemeDirective, AbbreviateNumberPipe],
  exports: [IntersectionObserverDirective, ThemeDirective, AbbreviateNumberPipe],
})
export class CoreDataModule {}
