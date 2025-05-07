import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CourseDetailCardComponent } from "../../../components/main/course-detail-card/course-detail-card.component";
import { OpenionCrousalComponent } from "../../../components/main/openion-crousal/openion-crousal.component";

@Component({
  selector: 'app-home',
  imports: [NgFor, CourseDetailCardComponent, OpenionCrousalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;

  featureArray: any[] = [
    {
      iconUrl: "/assets/home/svgexport-5.svg",
      title: "Our classes are chatty",
      description: "At Early Stage, children enjoy English and use it freely. We familiarize them with speaking from a very young age."

    },
    {
      iconUrl: "/assets/home/svgexport-6.svg",
      title: "We say NO to boredom",
      description: "We juggle interesting exercises, ensuring a high level of concentration and the joy of learning."

    }, {
      iconUrl: "/assets/home/svgexport-7.svg",
      title: "Effects without expiration date",
      description: "Our students are ready for the eighth grade exam, Cambridge, high school leaving exam.And most importantly – they express their thoughts in English!"

    },
    {
      iconUrl: "/assets/home/svgexport-8.svg",
      title: "We create a friendly atmosphere",
      description: "We are guided by empathy and care about good relationships - we want the kids to feel good in their group and come back to classes with a smile."

    },
    {
      iconUrl: "/assets/home/svgexport-9.svg",
      title: "We look broadly",
      description: "The structure of our classes also develops non-linguistic competences in students, including creativity, cooperation skills and critical thinking."

    }, {
      iconUrl: "/assets/home/svgexport-10.svg",
      title: "At your fingertips",
      description: "We teach at primary schools and kindergartens or in nearby locations. We are easy to find in the immediate vicinity."

    },
  ]

  cards = [
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Login',
      titleLine2: 'to Early Stage',
      description: 'Log in to Early Stage Online and use all the online tools we have prepared for students and parents.',
      linkText: 'Log in'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Smart Parent',
      titleLine2: 'Academy',
      description: 'Smart Parent Academy is materials for parents developed by experts: webinars and blog articles.',
      linkText: 'More'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'GRAMMAR RHYMES',
      titleLine2: 'Manual',
      description: 'GRAMMAR RHYMES – our original book for learning English grammar for children aged 8-14.',
      linkText: 'More'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Login',
      titleLine2: 'to Early Stage',
      description: 'Log in to Early Stage Online and use all the online tools we have prepared for students and parents.',
      linkText: 'Log in'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Smart Parent',
      titleLine2: 'Academy',
      description: 'Smart Parent Academy is materials for parents developed by experts: webinars and blog articles.',
      linkText: 'More'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'GRAMMAR RHYMES',
      titleLine2: 'Manual',
      description: 'GRAMMAR RHYMES – our original book for learning English grammar for children aged 8-14.',
      linkText: 'More'
    }
  ];

  isCarouselMode = false;
  currentIndex = 0;
  itemsPerView = 3;

  get visibleDots() {
    return new Array(Math.ceil(this.cards.length / this.itemsPerView));
  }

  @HostListener('window:resize')
  onResize() {
    this.isCarouselMode = window.innerWidth <= 1340;
  }

  ngOnInit() {
    this.onResize();
  }

  scrollToIndex(index: number) {
    const container = this.carouselContainer?.nativeElement;
    const scrollAmount = index * (container.scrollWidth / Math.ceil(this.cards.length / this.itemsPerView));
    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    this.currentIndex = index;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.scrollToIndex(this.currentIndex - 1);
    }
  }

  next() {
    const maxIndex = Math.ceil(this.cards.length / this.itemsPerView) - 1;
    if (this.currentIndex < maxIndex) {
      this.scrollToIndex(this.currentIndex + 1);
    }
  }

  goTo(index: number) {
    this.scrollToIndex(index);
  }
}