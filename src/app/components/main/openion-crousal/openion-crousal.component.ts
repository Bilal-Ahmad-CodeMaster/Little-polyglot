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
      text: `Zuzia uczy się w Polyglot Kids od 1. klasy. Przez 7 lat jej pewność siebie w mówieniu po angielsku niesamowicie wzrosła. Nie mogliśmy dokonać lepszego wyboru.`,
      author: `Anna, mama Zuzi (13 lat), Kraków`,
    },
    {
      text: `Na początku byłem sceptyczny, ale po zapisaniu syna do 1. klasy szybko zobaczyłem efekty. Polyglot Kids oferuje edukację z języka angielskiego na najwyższym poziomie – przekracza wszelkie oczekiwania.`,
      author: `Michał, tata Kuby (8 lat), Gdańsk`,
    },
    {
      text: `Wczesne rozpoczęcie nauki języka angielskiego w Polyglot Kids pomogło mojej córce mówić płynnie i swobodnie. Teraz, w liceum, z łatwością komunikuje się w szkole i za granicą.`,
      author: `Tomasz, tata Leny (18 lat), Warszawa`,
    },
    {
      text: `Moja córka uczęszcza na zajęcia od 4 lat. Pewnego wieczoru zaczęła mówić w domu tylko po angielsku – to był najlepszy dowód na to, że naprawdę się uczy i że sprawia jej to radość.`,
      author: `Katarzyna, mama Mai (11 lat), Wrocław`,
    },
    {
      text: `Już po roku nauki w Polyglot Kids mój syn znacznie wyprzedzał rówieśników. Zajęcia są kreatywne, dostosowane do wieku i naprawdę sprawiają dzieciom przyjemność.`,
      author: `Piotr, tata Franka (7 lat), Poznań`,
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