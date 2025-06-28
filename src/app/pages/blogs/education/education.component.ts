import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-education',
  imports: [CommonModule, RouterLink],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  constructor(private api: ApiServicesService, private router: Router) { }
  cards = [
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2025/06/zajecia-dodakowe-dla-dzieci-wroclaw-585x390.jpg',
      categories: ['Education'],
      title: 'Extracurricular activities for children in Wrocław',
      date: 'June 20, 2025',
      description: 'Which extracurricular activities for children to choose in Wrocław? After all, there are plenty of offers! Maybe English, football, ballet or robotics? We won\'t answer this question directly, because a lot depends on...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2025/06/ksiazeczki-po-angielsku-dla-dzieci-bear-band-stories-585x390.jpg',
      categories: ['Education'],
      title: 'English books for children – how to choose and why is it worth it?',
      date: 'June 16, 2025',
      description: 'Do you want your child to become familiar with English in a natural way? Do you want to learn the language without stress, but with joy and adventure? We have something that will work better than an app...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpg',
      categories: ['Creative Learning', 'Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/08/Dzien-matki-po-angielsku-585x390.jpg',
      categories: ['Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpghttps://earlystage.pl/blog/wp-content/uploads/2025/05/spring-games.jpg',
      categories: ['Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpghttps://earlystage.pl/blog/wp-content/uploads/2025/05/spring-games.jpg',
      categories: ['Creative Learning', 'Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpghttps://earlystage.pl/blog/wp-content/uploads/2025/05/spring-games.jpg',
      categories: ['Creative Learning', 'Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpghttps://earlystage.pl/blog/wp-content/uploads/2025/05/spring-games.jpg',
      categories: ['Creative Learning', 'Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpghttps://earlystage.pl/blog/wp-content/uploads/2025/05/spring-games.jpg',
      categories: ['Creative Learning', 'Education'],
      title: '6 Spring Games for Kids with English in the Background',
      date: 'May 21, 2025',
      description: 'The days are getting longer, the sun is peeking through the windows, and the world around you is exploding with colors. It\'s hard not to catch a spring surge of energy! It\'s worth using this energy well - preferably by playing with your children. Check it out...',
      link: '#'
    },
  ];
  allBlogs: any

  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.allBlogs = res.data.filter((b: any) => b.category === 'Wychowanie')
    })
  }

  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }

}
