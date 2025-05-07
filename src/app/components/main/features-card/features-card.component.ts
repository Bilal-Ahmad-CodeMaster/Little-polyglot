import { Component, Input } from '@angular/core';
interface featureArray{
  iconUrl:string,
  title:string,
  description:string
}
@Component({
  selector: 'app-features-card',
  imports: [],
  templateUrl: './features-card.component.html',
  styleUrl: './features-card.component.css'
})
export class FeaturesCardComponent {
  @Input() featureArray: featureArray[] = []
}
