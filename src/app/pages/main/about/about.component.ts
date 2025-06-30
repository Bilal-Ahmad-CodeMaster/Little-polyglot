import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FeatureComponent } from "../../../components/main/courses/feature/feature.component";
import { OpenionCrousalComponent } from "../../../components/main/openion-crousal/openion-crousal.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FeatureComponent, OpenionCrousalComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  currentIndex = 0;
  featureArray = [
    { iconUrl: '/assets/courses/feature1.svg', title: 'Development' },
    { iconUrl: '/assets/courses/feature2.svg', title: 'Authenticity' },
    { iconUrl: '/assets/courses/feature3.svg', title: 'Relationships' },
    { iconUrl: '/assets/courses/feature4.svg', title: 'Engagement' },
  ];


  items = [

    {
      type: 'video',
      videoUrl: 'https://..pl/storage/movies/film_o_szkole_2022.mp4',
      thumbnail: 'https://..pl/images/team-video/you_matter.webp',
      playing: false,
    },
    {
      type: 'video',
      videoUrl: 'https://..pl/storage/movies/You_Matter.mp4',
      thumbnail: 'https://..pl/images/team-video/film_o_szkole_2022.webp', // Replace with correct thumbnail if needed
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
