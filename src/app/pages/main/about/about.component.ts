import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FeatureComponent } from "../../../components/main/courses/feature/feature.component";
import { OpenionCrousalComponent } from "../../../components/main/openion-crousal/openion-crousal.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FeatureComponent, OpenionCrousalComponent, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  currentIndex = 0;
  featureArray = [
    { iconUrl: '../../../../../public/assets/courses/feature1.svg', title: 'Rozwój' },
    { iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'Autentyczność' },
    { iconUrl: '../../../../../public/assets/courses/feature3.svg', title: 'Relacje' },
    { iconUrl: '../../../../../public/assets/courses/feature4.svg', title: 'Zaangażowanie' },
  ];



  items = [

    {
      type: 'video',
      videoUrl: '../../../../../public/assets/about/1.mp4',
      thumbnail: '../../../../../public/assets/about/1thumbnail.jpg',
      playing: false,
    },
    {
      type: 'video',
      videoUrl: '../../../../../public/assets/about/2.mp4',
      thumbnail: '../../../../../public/assets/about/2thumbnail.jpg', // Replace with correct thumbnail if needed
      playing: false,
    },
  ];

  showVideo(item: any) {
    item.playing = true;
  }

  onVideoEnded(item: any) {
    item.playing = false;
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
}
