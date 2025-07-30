import { Component } from '@angular/core';
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-english-for-11-to-14-year-teen',
  imports: [CourseDetailCardComponent, OpenionCrousalComponent, FeatureComponent, SubHeroSectionComponent, RouterLink],
  templateUrl: './english-for-11-to-14-year-teen.component.html',
  styleUrl: './english-for-11-to-14-year-teen.component.css'
})
export class EnglishFor11To14YearTeenComponent {
  featureArray = [
    {
      iconUrl: 'fa-users', title: 'Grupy dopasowane pod względem wieku i poziomu znajomości języka'
    },
    {
      iconUrl: 'fa-language', title: 'Ambitny program i oryginalne podręczniki'
    },
    {
      iconUrl: 'fa-lightbulb', title: 'Przygotowanie do egzaminów Cambridge'
    },
    { iconUrl: 'fa-comments', title: 'Przygotowanie do egzaminu ósmoklasisty' },
    { iconUrl: 'fa-language', title: 'Dodatkowe materiały online' },
    {
      iconUrl: 'fa-users', title: 'Stały kontakt z lektorem'
    },
    { iconUrl: 'fa-graduation-cap', title: 'Monitorowanie postępów' },
    { iconUrl: 'fa-seedling', title: 'E-dziennik i aplikacja muzyczna' },
    { iconUrl: 'fa-language', title: 'Podsumowanie semestralne i roczne' }
  ];
}
