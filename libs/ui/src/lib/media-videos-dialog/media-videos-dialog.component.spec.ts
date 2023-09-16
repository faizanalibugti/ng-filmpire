import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaVideosDialogComponent } from './media-videos-dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('MediaVideosDialogComponent', () => {
  let component: MediaVideosDialogComponent;
  let fixture: ComponentFixture<MediaVideosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatDialogModule],
      declarations: [MediaVideosDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { videos: []} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaVideosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
