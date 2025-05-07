import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-openion-crousal',
  imports: [NgFor, CommonModule],
  templateUrl: './openion-crousal.component.html',
  styleUrl: './openion-crousal.component.css'
})
export class OpenionCrousalComponent {
  currentIndex = 1;
  previousIndex = 0;
  direction: 'left' | 'right' = 'right';

  reviews = [
    {
      text: `Hania has been studying at Early Stage since the 1st grade of primary school. For 7 years now, I believe that we made the best decision to choose Early Stage.`,
      author: `Dorota, mother of Hania (13 years old), Wrocław`,
    },
    {
      text: `I didn't think that all the good opinions I heard about the Early Stage school could be true. After a year of teaching a first grader, I can honestly recommend this school to anyone looking for a reliable language education for their children.`,
      author: `Magda, mother of Kajetan (8 years old), Wołomin`,
    },
    {
      text: `Learning English at Early Stage from the 1st grade gave my daughter the opportunity to use it freely after 5–6 years. Being ahead of the material compared to that at school gave me great comfort...`,
      author: `Sławek, father of Dominika (18 years old), Warsaw`,
    },
    {
      text: `My daughter has been attending school for 4 years. One day she decided at home that she would only speak English. For me this is the best proof that the money and time we have invested pays off.`,
      author: `Magda, Zuzia's mother (11 years old), Wrocław`,
    },
    {
      text: `After the first year of attending Early Stage, my son is significantly ahead of the standard curriculum and his peers. The material and program are 100% adapted to the stage and age of the children.`,
      author: `Magda, mother of Franek (age 7), Warsaw`,
    },
  ];

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  goTo(index: number) {
    this.currentIndex = index;
  }
}