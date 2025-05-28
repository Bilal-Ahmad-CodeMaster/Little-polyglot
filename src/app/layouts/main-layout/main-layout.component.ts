import { Component, Input } from '@angular/core';
import { MainHeaderComponent } from "../../shared/main-header/main-header.component";
import { MainFooterComponent } from "../../shared/main-footer/main-footer.component";
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [MainHeaderComponent, MainFooterComponent, RouterOutlet, CommonModule, NgIf],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  showFooter = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(event.url.includes('contact'));
        if (event.url.includes('schools')) {
          this.showFooter = !event.url.includes('schools');
        } else if (event.url.includes('contact')) {
          this.showFooter = !event.url.includes('contact');
        } else {
          this.showFooter = true;
        }
      });
  }
}
