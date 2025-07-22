import { CommonModule, NgFor } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CourseDetailCardComponent } from "../../../components/main/course-detail-card/course-detail-card.component";
import { OpenionCrousalComponent } from "../../../components/main/openion-crousal/openion-crousal.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, CourseDetailCardComponent, OpenionCrousalComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('carouselContainer') carouselContainer!: ElementRef<HTMLDivElement>;

  featureArray: any[] = [
    {
      iconUrl: "../../../../../public/assets/home/svgexport-5.svg",
      title: "Pewna siebie komunikacja zaczyna się wcześnie.",
      description: "W Polyglot Kids dzieci nie tylko uczą się angielskiego one zaczynają nim mówić z łatwością Wspieramy autentyczne rozmowy już od pierwszych zajęć."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-6.svg",
      title: "Angażujące lekcje za każdym razem",
      description: "U nas nie ma miejsca na nudne ćwiczenia.Nasze interaktywne zajęcia łączą kreatywność, zabawę i jasno określony cel, aby utrzymać ciekawość i koncentrację młodych umysłów."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-7.svg",
      title: "Trwała biegłość językowa",
      description: "Przygotowujemy dzieci nie tylko do egzaminów, ale do życia.Nasi uczniowie wyrastają na pewnych siebie mówców, którzy myślą i wyrażają się jasno po angielsku."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-8.svg",
      title: "Miejsce, gdzie dzieci czują przynależność",
      description: "Ciepło, integracja i zabawa definiują nasze sale lekcyjne.Dzieci rozwijają się w wspierających grupach, gdzie przyjaźnie rosną razem z umiejętnościami językowymi."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-9.svg",
      title: "Poza językiem: umiejętności na całe życie",
      description: "Nasz program nauczania integruje myślenie krytyczne, współpracę i kreatywność ponieważ wielojęzyczność to tylko część nastawienia gotowego na przyszłość."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-10.svg",
      title: "Nauka blisko domu",
      description: "Dzięki centrom w lokalnych szkołach, przedszkolach i ośrodkach społecznych, dołączenie do Polyglot Kids jest łatwe i wygodne dla każdej rodziny."
    }
  ];



  cards = [
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Zarejestruj się',
      titleLine2: 'w Polyglot Kids',
      description: 'Zarejestruj swoje dziecko w Polyglot Kids, aby odkrywać nowe możliwości i uczyć się angielskiego z profesjonalistami.',
      linkText: 'Zarejestruj się',
      link: "/registration/applicationForm"
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Akademia',
      titleLine2: 'Dla Mądrego Rodzica',
      description: 'Akademia Mądrego Rodzica to materiały dla rodziców opracowane przez ekspertów – webinary i artykuły na blogu.',
      linkText: 'Więcej',
      link: '/parent/smart-parent-academy'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'Artykuły / Blogi',
      titleLine2: 'Poznaj je',
      description: 'Odkrywaj ciekawe i edukacyjne artykuły dla rodziców i uczniów! Od wskazówek językowych po kreatywne aktywności — ucz się angielskiego w inspirujący sposób.',
      linkText: 'Więcej',
      link: '/blogs'
    }
  ];




}