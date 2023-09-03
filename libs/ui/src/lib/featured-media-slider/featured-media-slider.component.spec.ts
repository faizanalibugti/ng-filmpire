import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMediaSliderComponent } from './featured-media-slider.component';

describe('FeaturedMediaSliderComponent', () => {
  let component: FeaturedMediaSliderComponent;
  let fixture: ComponentFixture<FeaturedMediaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedMediaSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedMediaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
