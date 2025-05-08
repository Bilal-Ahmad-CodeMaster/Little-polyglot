import { Component, Input } from '@angular/core';

interface HeroContent {
  breadcrumb: {
    label: string;
    link: string;
    current: string;
  };
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;

}

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  @Input() content!: HeroContent;
}
