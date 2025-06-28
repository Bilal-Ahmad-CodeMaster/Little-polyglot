import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-main-header',
  imports: [RouterLink, NgIf, NgFor, CommonModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class MainHeaderComponent {
  dropdown: string | null = null;
  branches: any
  constructor(private api: ApiServicesService) { }
  ngOnInit(): void {
    this.api.getBranches().subscribe(
      (res: any) => {
        this.branches = res.data
        console.log(this.branches);
      },
      (error) => {
        console.error('Failed to fetch branches', error);
        this.branches = [];
      }
    );
  }
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
      schools: this.branches.map((branch: { region: any; }) => ({
        item: branch.region,
        routerLink: "/schools",
        queryParams: { branch: branch.region }
      })), parent: [{
        item: 'Sign Up your child to Polyglot Kids', routerLink: "/registration/applicationForm"
      }, {
        item: `Smart Parent Academy`, routerLink: "/parent/smart-parent-academy"
      }],
      blog: [{
        item: 'Education', routerLink: "/blogs/education"
      }, { item: 'Creative Learning', routerLink: "/blogs/creativeLearning" }, { item: 'Interesting Places', routerLink: "/blogs/interestingPlaces" }],
    };
    return submenus[menu] || [];
  }
}
