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

  getSubmenuItems(menu: string): string[] {
    const submenus: { [key: string]: string[] } = {
      courses: ['Frontend', 'Backend', 'Fullstack'],
      parent: ['Child Progress', 'Parental Guide', 'Feedback'],
      blog: ['Latest Posts', 'Tips & Tricks', 'Success Stories'],
    };
    return submenus[menu] || [];
  }
}
