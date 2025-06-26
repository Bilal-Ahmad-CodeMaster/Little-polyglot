import { CommonModule, NgIf } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-school-detail-modal',
  standalone: true,
  imports: [NgIf, CommonModule, RouterLink],
  templateUrl: './school-detail-modal.component.html',
  styleUrl: './school-detail-modal.component.css'
})
export class SchoolDetailModalComponent implements OnInit {
  activeTab = 'price-list';

  categories: any = [];
  schoolDetails: any = [];
  isModalOpen = false;
  activeIndex: any = 0;
  accordionItems: any
  contactInfo: any
  constructor(private sharedService: SharedServiceService) { }
 
  ngOnInit() {
    this.sharedService.showDetails$.subscribe((value) => {
      if (value) this.schoolDetails = value;
      setTimeout(() => {
        if (this.schoolDetails.priceList[0].groups) {
          this.accordionItems = this.schoolDetails.priceList[0].groups;

        }
        if (this.schoolDetails.contactInfo.headmaster) {
          this.contactInfo = this.schoolDetails.contactInfo.headmaster
          console.log(this.contactInfo);

        }
      }, 100);
    });

    this.sharedService.showModal$.subscribe((value: boolean | null) => {
      this.isModalOpen = value ?? false;
    });


  }



  closeModal() {
    this.isModalOpen = false;
    this.sharedService.showModal(this.isModalOpen);
  }

  setActiveItem(index: number): void {
    this.activeIndex = index;
  }


  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }
}
