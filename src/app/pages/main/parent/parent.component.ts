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
      titleLine1: 'Sign UP',
      titleLine2: 'to Polyglot Kids',
      description: 'SignUp to Polyglot Kids to explore new things for your children and learn english from professionals',
      linkText: 'SignUp',
      link: "/registration/applicationForm"
    },
    {
      icon: 'https://storage.googleapis.com/a1aa/image/eecab23f-bfb5-4eb1-dd42-cc71ecb9f0fc.jpg',
      titleLine1: 'Smart Parent',
      titleLine2: 'Academy',
      description: 'Smart Parent Academy is materials for parents developed by experts: webinars and blog articles.',
      linkText: 'More',
      link: '/parent/smart-parent-academy'
    },


    {
      icon: 'https://storage.googleapis.com/a1aa/image/a15d0c59-0db1-4c8f-a202-c3be8bc4516f.jpg',
      titleLine1: 'Articles/Blogs',
      titleLine2: 'Learn It',
      description: 'Discover fun, educational articles for parents and students! From language tips to creative activities, explore how learning English can be engaging and inspiring.',
      linkText: 'More',
      link: '/blogs'
    }

  ];


}
