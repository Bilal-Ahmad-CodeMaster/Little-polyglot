import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../../../components/main/courses/hero-section/hero-section.component";
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { OpenionCrousalComponent } from "../../../../components/main/openion-crousal/openion-crousal.component";
import { DemoVideoComponent } from "../../../../components/main/courses/demo-video/demo-video.component";
import { CourseDetailCardComponent } from "../../../../components/main/course-detail-card/course-detail-card.component";
import { SubHeroSectionComponent } from "../../../../components/main/courses/sub-hero-section/sub-hero-section.component";

@Component({
  selector: 'app-english-for-3-to-6-year-kids',
  imports: [FeatureComponent, OpenionCrousalComponent, DemoVideoComponent, CourseDetailCardComponent, SubHeroSectionComponent],
  templateUrl: './english-for-3-to-6-year-kids.component.html',
  styleUrl: './english-for-3-to-6-year-kids.component.css'
})
export class EnglishFor3To6YearKidsComponent {
  featureArray = [
    { iconUrl: '/assets/courses/feature1.svg', title: 'Our classes are chatty' },
    { iconUrl: '/assets/courses/feature2.svg', title: 'Ongoing contact with the lecturer' },
    { iconUrl: '/assets/courses/feature3.svg', title: 'Semester and end of year summary' },
    { iconUrl: '/assets/courses/feature4.svg', title: 'Progress monitoring' },
    { iconUrl: '/assets/courses/feature5.svg', title: 'Additional online materials' },
    { iconUrl: '/assets/courses/feature6.svg', title: 'Access to the Early Stage Music App' },
    { iconUrl: '/assets/courses/feature7.svg', title: 'Access to e-journal' }
  ];

}
