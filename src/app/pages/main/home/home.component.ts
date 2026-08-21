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
      iconUrl: "fa-comments",
      title: "Pewna siebie komunikacja zaczyna się wcześnie.",
      description: "Dzieci szybko zaczynają mówić z łatwością – wspieramy autentyczne rozmowy już od pierwszych zajęć."
    },
    {
      iconUrl: "fa-lightbulb",
      title: "Angażujące lekcje za każdym razem",
      description: "Żadnych nudnych ćwiczeń – nasze zajęcia łączą kreatywność, zabawę i jasny cel."
    },
    {
      iconUrl: "fa-language",
      title: "Trwała biegłość językowa",
      description: "Przygotowujemy dzieci nie tylko do egzaminów, ale do życia – uczymy pewnej i jasnej komunikacji."
    },
    {
      iconUrl: "fa-users",
      title: "Miejsce, gdzie dzieci czują przynależność",
      description: "Ciepło i integracja definiują nasze zajęcia – przyjaźnie rosną razem z umiejętnościami językowymi."
    },
    {
      iconUrl: "fa-seedling",
      title: "Poza językiem: umiejętności na całe życie",
      description: "Uczymy też myślenia krytycznego, współpracy i kreatywności – kompetencji przyszłości."
    },
    {
      iconUrl: "fa-graduation-cap",
      title: "Nauka blisko domu",
      description: "Centra w lokalnych szkołach i przedszkolach – dołączenie do Polyglot Kids jest łatwe i wygodne."
    }
  ];



  cards = [
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Zarejestruj się',
      titleLine2: 'w Polyglot Kids',
      description: 'Zarejestruj swoje dziecko w Polyglot Kids, aby odkrywać nowe możliwości i uczyć się amerykańskiego angielskiego, brytyjskiego angielskiego lub polskiego z profesjonalistami.',
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
      description: 'Odkrywaj ciekawe i edukacyjne artykuły dla rodziców i uczniów! Od wskazówek językowych po kreatywne aktywności — ucz się amerykańskiego angielskiego, brytyjskiego angielskiego lub polskiego w inspirujący sposób.',
      linkText: 'Więcej',
      link: '/blogs'
    }
  ];




}