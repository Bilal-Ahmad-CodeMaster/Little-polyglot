import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-superpower-card',
  imports: [CommonModule,NgIf],
  templateUrl: './superpower-card.component.html',
  styleUrl: './superpower-card.component.css'
})
export class SuperpowerCardComponent {
  @Input() card: any;
  @Input() isExpanded = false;
  @Input() onToggle!: () => void;

}
