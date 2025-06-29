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
      text: `Zuzia has been learning at Polyglot Kids since the 1st grade. Over 7 years, her confidence in speaking English has grown incredibly. We couldn't have made a better choice.`,
      author: `Anna, mother of Zuzia (13 years old), Kraków`,
    },
    {
      text: `I was skeptical at first, but after enrolling my son in Grade 1, I quickly saw results. Polyglot Kids offers high-quality English education that goes beyond expectations.`,
      author: `Michał, father of Kuba (8 years old), Gdańsk`,
    },
    {
      text: `Starting English early with Polyglot Kids helped my daughter speak fluently and with ease. Now, in high school, she communicates confidently both at school and abroad.`,
      author: `Tomasz, father of Lena (18 years old), Warsaw`,
    },
    {
      text: `My daughter has been attending classes for 4 years now. One evening, she started speaking only English at home—it was the best proof that she’s really learning and enjoying it.`,
      author: `Katarzyna, mother of Maja (11 years old), Wrocław`,
    },
    {
      text: `After just one year at Polyglot Kids, my son was clearly ahead of his peers. The lessons are creative, age-appropriate, and actually fun for the children.`,
      author: `Piotr, father of Franek (7 years old), Poznań`,
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