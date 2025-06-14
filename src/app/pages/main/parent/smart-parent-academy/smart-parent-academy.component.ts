import { Component } from '@angular/core';
import { FeatureComponent } from "../../../../components/main/courses/feature/feature.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-smart-parent-academy',
  imports: [FeatureComponent, RouterLink],
  templateUrl: './smart-parent-academy.component.html',
  styleUrl: './smart-parent-academy.component.css'
})
export class SmartParentAcademyComponent {
  featureArray = [
    { iconUrl: '/assets/courses/feature1.svg', title: 'Education Blog' },
    { iconUrl: '/assets/courses/feature2.svg', title: 'Parenting Webinars' },
    { iconUrl: '/assets/courses/feature3.svg', title: 'Valuable newsletter' },
  ];
}
