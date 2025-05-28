import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class MainHeaderComponent {
  dropdown: string | null = null;

  isMobileMenuOpen = false;
  activeSubmenu: string | null = null;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.activeSubmenu = null;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.activeSubmenu = null;
  }

  openSubmenu(menu: string): void {
    this.activeSubmenu = menu;
  }

  backToMainMenu(): void {
    this.activeSubmenu = null;
  }

  getSubmenuItems(menu: string): { item: string, routerLink: string }[] {
    const submenus: { [key: string]: { item: string, routerLink: string }[] } = {
      courses: [{ item: 'English for children 3-6 years old', routerLink: "/courses/english-for-children-3-6" }, { item: 'English for children 7-10 years old', routerLink: "/courses/english-for-children-7-10" }, { item: 'English for youth 11-14 years old', routerLink: "/courses/english-for-children-11-14" }, { item: 'English for young people 15-19 years old', routerLink: "/courses/english-for-children-14-19" }],
      schools: [{ item: 'Lower Silesia', routerLink: "/schools" }, { item: 'Kuyavian-Pomeranian Voivodeship', routerLink: "/schools" } ],
      parent: [{ item: 'Child Progress', routerLink: "/parent/child-progress" }, { item: 'Parental Guide', routerLink: "/parent/guide" }, { item: 'Feedback', routerLink: "/parent/feedback" }],
      blog: [{ item: 'Latest Posts', routerLink: "/blog/latest" }, { item: 'Tips & Tricks', routerLink: "/blog/tips" }, { item: 'Success Stories', routerLink: "/blog/success" }],
    };
    return submenus[menu] || [];
  }
}
