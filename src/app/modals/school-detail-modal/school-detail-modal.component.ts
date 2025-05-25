import { CommonModule, NgIf } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild, AfterViewInit
} from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-school-detail-modal',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './school-detail-modal.component.html',
  styleUrl: './school-detail-modal.component.css'
})
export class SchoolDetailModalComponent implements OnInit, AfterViewInit {
  activeTab = 'price-list';
  activeCategory = 0;
  tabs = ['price-list', 'contact', 'gallery', 'demonstration lesson'];
  categories = ['Kindergarten', '1st class', '2nd class', '3-6th grade', '7th grade', '8th grade', 'High school'];
  schoolDetails: any = [];
  isModalOpen = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @ViewChild('priceListSection') priceListSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  @ViewChild('gallerySection') gallerySection!: ElementRef;
  @ViewChild('demoSection') demoSection!: ElementRef;

  tabSections: { key: string, el: ElementRef }[] = [];

  constructor(private sharedService: SharedServiceService) { }
  ngOnInit() {
    this.sharedService.showDetails$.subscribe((value) => {
      if (value) this.schoolDetails = value;
    });

    this.sharedService.showModal$.subscribe((value: boolean | null) => {
      this.isModalOpen = value ?? false;

      // Wait for DOM to render after modal opens
      if (this.isModalOpen) {
      setTimeout((): void => {
        this.initializeTabRefs();
      }, 0);
      }
    });
  }

  initializeTabRefs() {
    if (
      this.priceListSection &&
      this.contactSection &&
      this.gallerySection &&
      this.demoSection
    ) {
      this.tabSections = [
        { key: 'price-list', el: this.priceListSection },
        { key: 'contact', el: this.contactSection },
        { key: 'gallery', el: this.gallerySection },
        { key: 'demonstration lesson', el: this.demoSection }
      ];
    }
  }

  ngAfterViewInit() {
    // Initial check (if modal is already open somehow)
    if (this.isModalOpen) {
      this.initializeTabRefs();
    }
  }


  scrollToTab(section: ElementRef, tabKey: string) {
    const container = this.scrollContainer.nativeElement;
    const offsetTop = section.nativeElement.offsetTop;
    container.scrollTo({ top: offsetTop - 10, behavior: 'smooth' });
    this.activeTab = tabKey;
  }

  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const scrollPosition = container.scrollTop;

    let closestSection = this.tabSections[0];
    let minDistance = Number.MAX_VALUE;

    this.tabSections.forEach(({ key, el }) => {
      const sectionTop = el.nativeElement.offsetTop;
      const distance = Math.abs(scrollPosition - sectionTop);
      if (distance < minDistance) {
        minDistance = distance;
        closestSection = { key, el };
      }
    });

    this.activeTab = closestSection.key;
  }

  closeModal() {
    this.isModalOpen = false;
    this.sharedService.showModal(this.isModalOpen);
  }
}
