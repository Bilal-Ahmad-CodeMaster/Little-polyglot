import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  imports: [HeaderComponent, RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
