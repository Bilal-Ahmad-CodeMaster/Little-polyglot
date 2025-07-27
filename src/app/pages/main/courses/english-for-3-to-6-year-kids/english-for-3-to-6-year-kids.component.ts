import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../../../components/main/courses/hero-section/hero-section.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-english-for-3-to-6-year-kids',
  imports: [FeatureComponent, OpenionCrousalComponent, CourseDetailCardComponent, SubHeroSectionComponent,RouterLink],
  templateUrl: './english-for-3-to-6-year-kids.component.html',
  styleUrl: './english-for-3-to-6-year-kids.component.css'
})
export class EnglishFor3To6YearKidsComponent {
  featureArray = [
    { iconUrl: '../../../../../public/assets/courses/feature1.svg', title: 'Nasze zajęcia są pełne rozmów' },
    { iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'Stały kontakt z lektorem' },
    { iconUrl: '../../../../../public/assets/courses/feature3.svg', title: 'Podsumowanie semestralne i roczne' },
    { iconUrl: '../../../../../public/assets/courses/feature4.svg', title: 'Monitorowanie postępów' },
    { iconUrl: '../../../../../public/assets/courses/feature5.svg', title: 'Dodatkowe materiały online' },
    { iconUrl: '../../../../../public/assets/courses/feature6.svg', title: 'Dostęp do aplikacji muzycznej Polyglot Kids' },
    { iconUrl: '../../../../../public/assets/courses/feature7.svg', title: 'Access to e-journal' }
  ];

}
