import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-home',
  imports: [CommonModule],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent {
  popularPosts = [
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2025/06/nowy-podrecznik-dla-uczniow-early-stage-upside-down-1-585x390.png',
    link: 'https://earlystage.pl/blog/upside-down-od-early-stage-nowy-zwariowany-kurs-i-podrecznik-do-angielskiego-dla-1-i-2-klasy/',
    title: 'Upside Down from Early Stage: A crazy new English course and textbook for 1st and 2nd grades!'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2025/06/ksiazeczki-po-angielsku-dla-dzieci-bear-band-stories-585x390.jpg',
    link: 'https://earlystage.pl/blog/ksiazeczki-po-angielsku-dla-dzieci-jak-wybrac-i-dlaczego-warto/',
    title: 'English books for children – how to choose and why is it worth it?'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2025/06/possesives-zaimki-dzierzawcze-po-angielsku-585x390.jpg',
    link: 'https://earlystage.pl/blog/zaimki-dzierzawcze-w-jezyku-angielskim-possesive-pronouns/',
    title: 'Possessive pronouns in English'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2021/07/O-podrozowaniu-z-dziecmi-585x390.jpg',
    link: 'https://earlystage.pl/blog/o-podrozowaniu-z-dziecmi/',
    title: 'About traveling with children'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2024/04/polkolonie-letnie-dla-dzieci-early-stage-play-to-grow-585x390.jpg',
    link: 'https://earlystage.pl/blog/polkolonie-letnie-dla-dzieci-play-to-grow-ile-trwaja/',
    title: 'Play to Grow summer camps for children. How long do they last? What makes them stand out?'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2021/03/Daty-po-angielsku-kilka-praktycznych-porad--585x390.jpg',
    link: 'https://earlystage.pl/blog/daty-po-angielsku-jak-je-prawidlowo-zapisywac-i-odczytywac/',
    title: 'Dates in English – how to write and read them correctly?'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2021/03/Dni-tygodnia-po-angielsku-skad-wziely-sie-ich-nazwy--585x390.jpg',
    link: 'https://earlystage.pl/blog/dni-tygodnia-po-angielsku-skad-wziely-sie-ich-nazwy/',
    title: 'Days of the Week in English. How to Write, Read, Remember Them?'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2024/03/poziomy-znajomosci-jezyka-angielskiego-co-znaczy-a1-a2-b1-b2-585x390.jpg',
    link: 'https://earlystage.pl/blog/poziomy-znajomosci-angielskiego/',
    title: 'English language proficiency levels – how to determine which one your child is at?'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2024/08/jak-napisac-emaila-przyklady-zasady-zwroty-585x390.jpg',
    link: 'https://earlystage.pl/blog/jak-napisac-maila-po-angielsku-zwroty-wzory-przyklady/',
    title: 'How to Write an Email in English? Phrases, Patterns, Examples'
  },
  {
    img: 'https://earlystage.pl/blog/wp-content/uploads/2022/07/Poznaj-najtrudniejsze-jezyki-swiata-585x390.jpg',
    link: 'https://earlystage.pl/blog/poznaj-najtrudniejsze-jezyki-swiata/',
    title: 'Learn the world\'s most difficult languages'
  }

  ];
  
}
