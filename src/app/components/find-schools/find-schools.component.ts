import { Component, HostListener } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SchoolDetailModalComponent } from "../../modals/school-detail-modal/school-detail-modal.component";
import { SharedServiceService } from '../../services/shared-service.service';
import { ApiServicesService } from '../../services/api-services.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-find-schools',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, SchoolDetailModalComponent, CommonModule, FormsModule],
  templateUrl: './find-schools.component.html',
  styleUrl: './find-schools.component.css',
})
export class FindSchoolsComponent implements OnInit {
  allBranches: any[] = []; // Original fetched list
  branches: any[] = [];
  globalIframeSrc: any = "";
  dropdownOpen: string | null = null;

  provinceSearch = '';
  selectedProvince: any | null = null;
  provinceOptions: any[] = [];

  citySearch = '';
  selectedCity: any | null = null;
  cityOptions: any[] = [];
  currRoute: any;


  constructor(private sharedService: SharedServiceService, private route: ActivatedRoute, private api: ApiServicesService, private sanitizer: DomSanitizer, private router: Router) {
    const rawUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38291.27281554404!2d17.523204484746508!3d53.14242340845767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4703a03bb964bed3%3A0xad0f7f8a02451a69!2zTmFrxYJvIG5hZCBOb3RlY2nEhSwgUG9sYW5k!5e0!3m2!1sen!2s!4v1750678214500!5m2!1sen!2s';
    this.globalIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const region = params['branch'];
      console.log('Selected Branch:', region);
      this.selectedProvince = region;
      this.filterBranches()

       this.currRoute = this.router.url

    });


    this.api.getBranches().subscribe({
      next: (response: any) => {
        this.allBranches = response.data;
        this.branches = response.data;

        const regions = new Set();
        const cities = new Set();

        for (const branch of response.data) {
          if (branch.region) regions.add(branch.region);
          if (branch.city) cities.add(branch.city);
        }

        this.provinceOptions = Array.from(regions);
        this.cityOptions = Array.from(cities);
      },
      error: (err) => {
        console.error('Error fetching branches:', err);
      }
    });

  }

  filterBranches() {
    setTimeout(() => {
      this.branches = this.allBranches.filter((branch: any) => {
        const matchesProvince = this.selectedProvince ? branch.region === this.selectedProvince : true;
        const matchesCity = this.selectedCity ? branch.city === this.selectedCity : true;
        return matchesProvince && matchesCity;
      });
    }, 500);
  }



  sendSchoolDetails(school: any) {


    this.sharedService.showDetails(school);
    // Extract src from the iframe string
    let rawUrl = '';
    const match = school.googleLocation.match(/src="([^"]+)"/);
    if (match && match[1]) {
      rawUrl = match[1];
    }
    this.globalIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    this.openModal();

  }
  openModal() {
    this.sharedService.showModal(true);
  }




  toggleDropdown(type: 'province' | 'city') {
    this.dropdownOpen = this.dropdownOpen === type ? null : type;
  }

  filteredProvinces() {
    return this.provinceOptions.filter(option =>
      option.toLowerCase().includes(this.provinceSearch.toLowerCase())
    );
  }

  filteredCities() {
    return this.cityOptions.filter(option =>
      option.toLowerCase().includes(this.citySearch.toLowerCase())
    );
  }
  selectProvince(province: string) {
    this.sharedService.showModal(false);
    this.selectedProvince = province;
    this.provinceSearch = '';
    this.dropdownOpen = null;
    this.filterBranches();

  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.citySearch = '';
    this.dropdownOpen = null;
    this.filterBranches();
    this.sharedService.showModal(false);

  }


}
