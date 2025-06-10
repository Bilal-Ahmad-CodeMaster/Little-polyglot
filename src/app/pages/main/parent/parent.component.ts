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
