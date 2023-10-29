import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from '@ng-filmpire/api-interfaces';

@Component({
  selector: 'ng-filmpire-media-videos-dialog',
  templateUrl: './media-videos-dialog.component.html',
  styleUrls: ['./media-videos-dialog.component.scss'],
})
export class MediaVideosDialogComponent implements OnInit {
  mediaVideosEntity!: Record<string, Video[]>;
  iframeLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { videos: Video[] },
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.mediaVideosEntity = this.mapVideoToDictionary(this.data.videos);
  }

  onIframeLoad() {
    this.iframeLoading = false;
  }

  mapVideoToDictionary(videos: Video[]): Record<string, Video[]> {
    const videoDictionary: Record<string, Video[]> = {};

    for (const video of videos) {
      if (!videoDictionary[video.type]) {
        // If the type doesn't exist as a key, create an empty array for it
        videoDictionary[video.type] = [];
      }

      video.videoURL = this.generateSafeURL(video.key);

      // Push the video into the corresponding type array
      videoDictionary[video.type].push(video);
    }

    return videoDictionary;
  }

  generateSafeURL(videoKey: string) {
    const videoURL = `https://www.youtube.com/embed/${videoKey}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(videoURL);
  }
}
