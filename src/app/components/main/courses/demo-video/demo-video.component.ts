import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-video',
  imports: [NgIf
  ],
  templateUrl: './demo-video.component.html',
  styleUrl: './demo-video.component.css'
})
export class DemoVideoComponent {

  @Input() videoUrl: string = '';
  @Input() thumbnailUrl: string = '';
  @Input() title: string = 'Watch a demo lesson';

  showVideo = false;

  playVideo() {
    this.showVideo = true;
  }
}