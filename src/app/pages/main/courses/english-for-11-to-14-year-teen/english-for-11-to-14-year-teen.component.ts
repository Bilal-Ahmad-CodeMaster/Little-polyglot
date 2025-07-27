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
      iconUrl: 'fa-users', title: 'Groups matched by age and language proficiency level'
    },
    {
      iconUrl: 'fa-language', title: 'An ambitious program and original textbooks'
    },
    {
      iconUrl: 'fa-lightbulb', title: 'Cambridge Exam Preparation'
    },
    { iconUrl: 'fa-comments', title: 'Preparation for the eighth-grade exam' },
    { iconUrl: 'fa-language', title: 'Additional online materials' },
    {
      iconUrl: 'fa-users', title: 'Ongoing contact with the lecturer'
    },
    { iconUrl: 'fa-graduation-cap', title: 'Progress monitoring' },
    { iconUrl: 'fa-seedling', title: 'E-journal and music app' },
    { iconUrl: 'fa-language', title: 'Semester and yearly summary' }
  ];
}
