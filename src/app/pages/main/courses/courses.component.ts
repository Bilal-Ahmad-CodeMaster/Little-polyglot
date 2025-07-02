import { Component } from '@angular/core';
import { HeroSectionComponent } from "../../../components/main/courses/hero-section/hero-section.component";
import { CourseDetailCardComponent } from "../../../components/main/course-detail-card/course-detail-card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [HeroSectionComponent, CourseDetailCardComponent, RouterLink],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

}
