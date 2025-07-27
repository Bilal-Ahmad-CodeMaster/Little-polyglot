import { Component } from '@angular/core';
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-english-for-7-to-10-year',
  imports: [SubHeroSectionComponent, FeatureComponent, OpenionCrousalComponent, RouterLink, CourseDetailCardComponent],
  templateUrl: './english-for-7-to-10-year.component.html',
  styleUrl: './english-for-7-to-10-year.component.css'
})
export class EnglishFor7To10YearComponent {
  featureArray = [
    {
      iconUrl: '../../../../../public/assets/courses/feature1.svg', title: 'Grupy dopasowane pod względem wieku i poziomu znajomości języka'
    },
    {
      iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'Ambitny program i oryginalne podręczniki'
    },
    {
      iconUrl: '../../../../../public/assets/courses/feature3.svg', title: 'Przygotowanie do egzaminów Cambridge'
    },
    { iconUrl: '../../../../../public/assets/courses/feature5.svg', title: 'Dodatkowe materiały online' },
    {
      iconUrl: '../../../../../public/assets/courses/feature4.svg', title: 'Stały kontakt z lektorem'
    },
    { iconUrl: '../../../../../public/assets/courses/feature6.svg', title: 'Monitorowanie postępów' },
    { iconUrl: '../../../../../public/assets/courses/feature7.svg', title: 'E-dziennik i aplikacja muzyczna' },
    { iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'Podsumowanie semestralne i roczne' }
  ];
}
