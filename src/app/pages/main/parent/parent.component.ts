import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-parent',
  imports: [RouterLink, NgFor],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  cards = [
    {
      icon: 'https://storage.googleapis.com/a1aa/image/f4ef5205-4f75-473d-f306-a62dec847a6f.jpg',
      titleLine1: 'Zapisz się',
      titleLine2: 'do Polyglot Kids',
      description: 'Zapisz swoje dziecko do Polyglot Kids, aby odkrywało nowe możliwości i uczyło się angielskiego od profesjonalistów',
      linkText: 'Zapisz się',
      link: "/registration/applicationForm"
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Akademia',
      titleLine2: 'Świadomego Rodzica',
      description: 'Materiały dla rodziców przygotowane przez ekspertów: webinary i artykuły na blogu.',
      linkText: 'Więcej',
      link: '/parent/smart-parent-academy'
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'Artykuły/Blog',
      titleLine2: 'Poznaj je',
      description: 'Odkryj ciekawe artykuły edukacyjne dla rodziców i uczniów! Od porad językowych po kreatywne aktywności - sprawdź, jak nauka angielskiego może być wciągająca i inspirująca.',
      linkText: 'Więcej',
      link: '/blogs'
    }
  ];


}
