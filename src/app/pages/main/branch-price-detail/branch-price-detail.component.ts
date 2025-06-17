import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-branch-price-detail',
  imports: [RouterLink, NgIf,NgFor,CommonModule],
  templateUrl: './branch-price-detail.component.html',
  styleUrl: './branch-price-detail.component.css'
})
export class BranchPriceDetailComponent {
  showMore: boolean = false;
  activeIndex = 0; // Default to first item
  showVideo = false;

  playVideo() {
    this.showVideo = true;
  }
  setActiveItem(index: number): void {
    this.activeIndex = index;
  }

  accordionItems = [
    {
      title: 'Kindergarten',
      cards: [
        {
          title: 'Kids (1xweek)',
          description: 'Classes once a week',
          schedule: '1 x 45 min',
          minutes: '',
          classes: '34 classes',
          price: '220 PLN per month',
          materials: 'PLN 200 for educational materials (payment in the first month)',
        },
        {
          title: 'Kids (2xweek)',
          description: 'Classes twice a week',
          schedule: '2 x 45 min',
          minutes: '',
          classes: '66 classes',
          price: '290 PLN per month',
          materials: 'PLN 200 for educational materials (payment in the first month)',
        },
      ],
    },
    {
      title: '1st class',
      cards: [
        {
          title: 'Juniors Level 1',
          description: 'Comprehensive English course',
          schedule: '2 x 60 min',
          minutes: '120 minutes',
          classes: '66 classes',
          price: '310 PLN per month',
          materials: 'PLN 218 for educational materials (payment in the first month)',
        },
      ],
    },
    {
      title: '2nd class', cards: [
        {
          title: 'Juniors Level 1',
          description: 'For students starting their studies',
          schedule: '2 x 60 min',
          minutes: '120 minutes',
          classes: '66 classes',
          price: '310 PLN per month',
          materials: `and PLN 218 for educational materials
(payment in the first month)`
        },
        {
          title: 'Juniors Level 2',
          description: 'For students continuing their education',
          schedule: '2 x 90 min',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: `and PLN 188 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '3-6th grade', cards: [
        {
          title: 'Juniors & Teens',
          description: 'Comprehensive English course',
          schedule: '2 x 90 ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: `and PLN 178-300 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '7th grade', cards: [
        {
          title: 'Teens',
          description: 'Comprehensive course with preparation for the 8th grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: `and PLN 310 for educational materials
(payment in the first month)`
        },
        {
          title: 'Exam Focus',
          description: 'One-year course preparing for the 8th-grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 310 for educational materials (payment in the first month)'
        },

      ], isOpen: false
    },
    {
      title: '8th grade',
      isOpen: false,
      cards: [
        {
          title: 'Exam Focus',
          description: 'One-year course preparing for the 8th-grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },
        {
          title: 'Teens',
          description: 'Comprehensive course with preparation for the 8th grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },
        {
          title: 'Pre-First & First',
          description: 'Cambridge Exam Preparation Course',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        }
      ]
    },
    {
      title: 'High school', cards: [
        {
          title: 'Teens',
          description: 'Comprehensive English course',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },

      ], isOpen: false
    },
  ];
  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }

}
