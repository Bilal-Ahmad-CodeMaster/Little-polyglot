import { Component, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchoolDetailModalComponent } from "../../modals/school-detail-modal/school-detail-modal.component";
import { SharedServiceService } from '../../services/shared-service.service';
import { ApiServicesService } from '../../services/api-services.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-find-schools',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, SchoolDetailModalComponent],
  templateUrl: './find-schools.component.html',
  styleUrl: './find-schools.component.css',
})
export class FindSchoolsComponent {
  dropdownOpen = false;
  selectedOptions: string[] = [];
  options: string[] = [
    'Kindergertin',
    '1st class',
    '2nd-6th grade',
    '7th-8th grade',
    'High School'
  ];
  branches: any;

  globalIframeSrc: any ="" ;
  constructor(private sharedService: SharedServiceService, private route: ActivatedRoute, private api: ApiServicesService, private sanitizer: DomSanitizer) {
    const rawUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38291.27281554404!2d17.523204484746508!3d53.14242340845767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703a03bb964bed3%3A0xad0f7f8a02451a69!2zTmFrxYJvIG5hZCBOb3RlY2nEhSwgUG9sYW5k!5e0!3m2!1sen!2s!4v1750678214500!5m2!1sen!2s';
    this.globalIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }
    
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      const branchName = params['branch'];
      console.log('Selected Branch:', branchName);

    })
    this.api.getBranches().subscribe({
      next: (response: any) => {
        console.log('Branches fetched successfully:', response.data);
        this.branches = response.data;
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
      }
    });
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
    return this.selectedOptions.length ? this.selectedOptions.join(', ') : 'Select City';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.dropdownOpen = false;
    }
  }


  sendSchoolDetails(school: { title: string; description: string; branches: string[]; details: string[] }) {
    // Logic to handle sending school details


    this.sharedService.showDetails({ title: school.title, description: school.description, branches: school.branches, details: school.details });
    this.openModal();

  }
  openModal() {
    this.sharedService.showModal(true);
  }
}
