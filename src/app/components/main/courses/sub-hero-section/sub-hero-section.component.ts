import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sub-hero-section',
  imports: [RouterLink,CommonModule],
  templateUrl: './sub-hero-section.component.html',
  styleUrl: './sub-hero-section.component.css'
})
export class SubHeroSectionComponent {
  @Input() title: string = 'Kursy językowe dla dzieci w wieku 3-6 lat';
  @Input() subtitle: string = 'ES Kids - Play & Sing';
  @Input() breadcrumb: string = 'Kursy językowe dla dzieci 3-6 lat - ES Kids';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
 
}
