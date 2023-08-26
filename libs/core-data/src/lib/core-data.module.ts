import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntersectionObserverDirective } from './directives/intersection-observer/intersection-observer.directive';
import { ThemeDirective } from './directives/theme/theme.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IntersectionObserverDirective, ThemeDirective],
  exports: [IntersectionObserverDirective, ThemeDirective],
})
export class CoreDataModule {}
