import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardItemComponent } from './media-card-item.component';

describe('MediaCardItemComponent', () => {
  let component: MediaCardItemComponent;
  let fixture: ComponentFixture<MediaCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediaCardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
