import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-admin-panel',
  imports: [HeaderComponent, RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(public loader: LoaderService) {}
}
