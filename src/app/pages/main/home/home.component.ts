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
      title: "Pewna komunikacja zaczyna się wcześnie",
      description: "At Polyglot Kids, children don’t just learn English—they speak it with ease. We foster real conversations from the very first class."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-6.svg",
      title: "Angażujące lekcje za każdym razem",
      description: "No dull drills here. Our interactive sessions mix creativity, play, and purpose to keep young minds curious and focused."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-7.svg",
      title: "Trwałe opanowanie języka",
      description: "We prepare children not just for exams, but for life. Our learners grow into confident speakers who think and express themselves clearly in English."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-8.svg",
      title: "Miejsce, gdzie dzieci czują przynależność",
      description: "Warmth, inclusivity, and fun define our classrooms. Kids thrive in supportive groups where friendships grow alongside language skills."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-9.svg",
      title: "Poza językiem: umiejętności na całe życie",
      description: "Our curriculum integrates critical thinking, collaboration, and creativity—because being multilingual is only part of the future-ready mindset."
    },
    {
      iconUrl: "../../../../../public/assets/home/svgexport-10.svg",
      title: "Nauka blisko domu",
      description: "With centers at local schools, preschools, and community hubs, joining Polyglot Kids is easy and convenient for every family."
    }
  ];



  cards = [
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Zarejestruj się',
      titleLine2: 'w Polyglot Kids',
      description: 'Zarejestruj się w Polyglot Kids, aby odkrywać nowe możliwości dla swojego dziecka i uczyć się angielskiego od profesjonalistów.',
      linkText: 'Zarejestruj się',
      link: "/registration/applicationForm"
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Akademia',
      titleLine2: 'Mądrego Rodzica',
      description: 'Akademia Mądrego Rodzica to materiały dla rodziców opracowane przez ekspertów: webinary i artykuły na blogu.',
      linkText: 'Więcej',
      link: '/parent/smart-parent-academy'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'Artykuły/Blogi',
      titleLine2: 'Poznaj je',
      description: 'Odkrywaj ciekawe i edukacyjne artykuły dla rodziców i uczniów! Od wskazówek językowych po kreatywne aktywności — ucz się angielskiego w inspirujący sposób.',
      linkText: 'Więcej',
      link: '/blogs'
    }
  ];




}