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
      iconUrl: "/assets/home/svgexport-5.svg",
      title: "Confident Communication Starts Early",
      description: "At Polyglot Kids, children don’t just learn English—they speak it with ease. We foster real conversations from the very first class."
    },
    {
      iconUrl: "/assets/home/svgexport-6.svg",
      title: "Engaging Lessons, Every Time",
      description: "No dull drills here. Our interactive sessions mix creativity, play, and purpose to keep young minds curious and focused."
    },
    {
      iconUrl: "/assets/home/svgexport-7.svg",
      title: "Lasting Language Mastery",
      description: "We prepare children not just for exams, but for life. Our learners grow into confident speakers who think and express themselves clearly in English."
    },
    {
      iconUrl: "/assets/home/svgexport-8.svg",
      title: "A Place Where Kids Feel Belonging",
      description: "Warmth, inclusivity, and fun define our classrooms. Kids thrive in supportive groups where friendships grow alongside language skills."
    },
    {
      iconUrl: "/assets/home/svgexport-9.svg",
      title: "Beyond Language: Skills for Life",
      description: "Our curriculum integrates critical thinking, collaboration, and creativity—because being multilingual is only part of the future-ready mindset."
    },
    {
      iconUrl: "/assets/home/svgexport-10.svg",
      title: "Learning Close to Home",
      description: "With centers at local schools, preschools, and community hubs, joining Polyglot Kids is easy and convenient for every family."
    }
  ];
  

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



}