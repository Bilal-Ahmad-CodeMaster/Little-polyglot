import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-hero-section',
  imports: [RouterLink],
  templateUrl: './sub-hero-section.component.html',
  styleUrl: './sub-hero-section.component.css'
})
export class SubHeroSectionComponent {
  @Input() title: string = 'English for children aged 3-6';
  @Input() subtitle: string = 'ES Kids - Play & Sing';
  @Input() breadcrumb: string = 'English for children 3-6 years old - ES Kids';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() shieldUrl: string = '';
}
