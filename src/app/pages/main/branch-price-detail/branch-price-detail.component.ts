import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServicesService } from '../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-branch-price-detail',
  imports: [RouterLink, NgIf, NgFor, CommonModule],
  templateUrl: './branch-price-detail.component.html',
  styleUrl: './branch-price-detail.component.css'
})
export class BranchPriceDetailComponent {
  showMore: boolean = false;
  activeIndex = 0; // Default to first item
  showVideo = false;
  BrachData: any;
  globalIframeSrc: any;
  contactDetail: any;
  accordionItems: any
  constructor(private route: ActivatedRoute, private api: ApiServicesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const branchId = params['branchId'];
      console.log('Selected branchId:', branchId);
      if (branchId) {
        setTimeout(() => {
          this.api.getSingleBranch(branchId).subscribe(
            (branch: any) => {
              this.BrachData = branch.data;
              this.accordionItems = this.BrachData.priceList[0].groups;
              console.log("accordian ", this.accordionItems);
              this.contactDetail = branch.data.contactInfo
              console.log('contact data:', this.contactDetail);
              let rawUrl = '';
              const match = this.BrachData.googleLocation.match(/src="([^"]+)"/);
              if (match && match[1]) {
                rawUrl = match[1];
              }
              this.globalIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
            },
            (error) => {
              console.error('Error fetching branch:', error);
            }
          );
        }, 0);
      }
    });
  }
  playVideo() {
    this.showVideo = true;
  }
  setActiveItem(index: number): void {
    this.activeIndex = index;
  }


  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }

}
