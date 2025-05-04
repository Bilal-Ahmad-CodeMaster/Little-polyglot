import { Component, Input } from '@angular/core';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { MainFooterComponent } from "../../shared/main-footer/main-footer.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [MainHeaderComponent, MainFooterComponent, RouterOutlet, CommonModule, NgIf],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  @Input() showFooter = true;
}
