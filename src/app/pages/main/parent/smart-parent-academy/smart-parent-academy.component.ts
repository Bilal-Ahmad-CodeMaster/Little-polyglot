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
    { iconUrl: 'fa-seedling', title: 'Blog edukacyjny' },
    { iconUrl: 'fa-graduation-cap', title: 'Webinary dla rodziców' },
    { iconUrl: 'fa-users', title: 'Wartościowy newsletter' },
  ];

}
