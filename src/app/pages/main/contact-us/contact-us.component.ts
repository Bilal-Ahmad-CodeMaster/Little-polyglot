import { Component, HostListener } from '@angular/core';
import { SharedServiceService } from '../../../services/shared-service.service';
import { NgFor, NgIf } from '@angular/common';
import { FindSchoolsComponent } from "../../../components/find-schools/find-schools.component";

@Component({
  selector: 'app-contact-us',
  imports: [NgFor, NgIf, FindSchoolsComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  dropdownOpen = false;
  selectedOptions: string[] = [];
  options: string[] = [
    'Przedszkole',
    '1. klasa',
    '2.–6. klasa',
    '7.–8. klasa',
    'Liceum'
  ];

  constructor(private sharedService: SharedServiceService) { }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isChecked(option: string): boolean {
    return this.selectedOptions.includes(option);
  }

  get displayValue(): string {
    return this.selectedOptions.length ? this.selectedOptions.join(', ') : 'Select age group';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.dropdownOpen = false;
    }
  }

  locations = [
    {
      title: 'ul. Antoniuk Fabryczny 5/7',
      description: 'Szkoła Podstawowa nr 24 im. 2 Korpusu Polskich Sił Zbrojnych na Zachodzie',
      branches: ['Białystok', 'Białystok I'],
      details: [
        'Zajęcia na terenie tej placówki',
        'Zapraszamy uczniów z pobliskich placówek'
      ]
    },
    {
      title: 'ul. Noniewicza 85C/16',
      description: 'Lokal Noniewicza 85C/16',
      branches: ['Białystok', 'Białystok I'],
      details: [
        'Zajęcia na terenie tej placówki',
        'Zapraszamy uczniów z pobliskich placówek'
      ]
    }
  ];
  sendSchoolDetails(school: { title: string; description: string; branches: string[]; details: string[] }) {
    // Logic to handle sending school details


    this.sharedService.showDetails({ title: school.title, description: school.description, branches: school.branches, details: school.details });
    this.openModal();

  }
  openModal() {
    this.sharedService.showModal(true);
  }
}
