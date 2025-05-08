import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature',
  imports: [NgFor],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.css'
})
export class FeatureComponent {

  @Input() featureArray: { iconUrl: string; title: string }[] = [];
}
