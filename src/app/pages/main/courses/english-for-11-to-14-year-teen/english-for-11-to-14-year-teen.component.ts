import { Component } from '@angular/core';
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-english-for-11-to-14-year-teen',
  imports: [CourseDetailCardComponent , OpenionCrousalComponent, FeatureComponent, SubHeroSectionComponent, RouterLink],
  templateUrl: './english-for-11-to-14-year-teen.component.html',
  styleUrl: './english-for-11-to-14-year-teen.component.css'
})
export class EnglishFor11To14YearTeenComponent {
  featureArray = [
    {
      iconUrl: '../../../../../public/assets/courses/feature1.svg', title: 'Groups matched by age and language proficiency level'
    },
    {
      iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'An ambitious program and original textbooks'
    },
    {
      iconUrl: '../../../../../public/assets/courses/feature3.svg', title: 'Cambridge Exam Preparation'
    },
    { iconUrl: '../../../../../public/assets/courses/feature3.svg', title: 'Preparation for the eighth-grade exam' },
    { iconUrl: '../../../../../public/assets/courses/feature5.svg', title: 'Additional online materials' },
    {
      iconUrl: '../../../../../public/assets/courses/feature4.svg', title: 'Ongoing contact with the lecturer'
    },
    { iconUrl: '../../../../../public/assets/courses/feature6.svg', title: 'Progress monitoring' },
    { iconUrl: '../../../../../public/assets/courses/feature7.svg', title: 'E-journal and music app' },
    { iconUrl: '../../../../../public/assets/courses/feature2.svg', title: 'Semester and yearly summary' }
  ];
}
