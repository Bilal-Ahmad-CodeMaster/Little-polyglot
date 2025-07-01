import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";

@Component({
  selector: 'app-english-for-14-to-19-year-old',
  imports: [CourseDetailCardComponent, RouterLink, OpenionCrousalComponent, FeatureComponent, SubHeroSectionComponent,RouterLink],
  templateUrl: './english-for-14-to-19-year-old.component.html',
  styleUrl: './english-for-14-to-19-year-old.component.css'
})
export class EnglishFor14To19YearOldComponent {
  featureArray = [
    {
      iconUrl: '/assets/courses/feature1.svg', title: 'Groups matched by age and language proficiency level'
    },
    {
      iconUrl: '/assets/courses/feature2.svg', title: 'An ambitious program and original textbooks'
    },
    {
      iconUrl: '/assets/courses/feature3.svg', title: 'Cambridge Exam Preparation'
    },
    { iconUrl: '/assets/courses/feature3.svg', title: 'Preparation for the eighth-grade exam' },
    { iconUrl: '/assets/courses/feature5.svg', title: 'Additional online materials' },
    {
      iconUrl: '/assets/courses/feature4.svg', title: 'Ongoing contact with the lecturer'
    },
    { iconUrl: '/assets/courses/feature6.svg', title: 'Progress monitoring' },
    { iconUrl: '/assets/courses/feature7.svg', title: 'E-journal and music app' },
    { iconUrl: '/assets/courses/feature2.svg', title: 'Semester and yearly summary' }
  ];
}
