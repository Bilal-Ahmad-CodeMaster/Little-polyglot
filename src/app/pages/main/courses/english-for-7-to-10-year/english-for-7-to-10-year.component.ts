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
