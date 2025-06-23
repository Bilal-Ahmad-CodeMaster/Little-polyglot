import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-blogs-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './blogs-header.component.html',
  styleUrl: './blogs-header.component.css'
})
export class BlogsHeaderComponent {
  as: boolean = true
  isMenuOpen = false;
  education = [
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpg',
      tag: 'Creative learning',
      title: '6 Spring Activities for Kids with English…',
      date: 'May 21, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/08/Dzien-matki-po-angielsku-585x390.jpg',
      tag: 'Education',
      title: "Mother's Day in English",
      date: 'May 12, 2025',
      link: 's'
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2021/07/O-podrozowaniu-z-dziecmi-585x390.jpg',
      tag: 'Education',
      title: 'About traveling with children',
      date: 'May 6, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2017/11/zlosc-585x390.jpg',
      tag: 'Education',
      title: 'How to deal with anger towards your child?',
      date: 'May 1, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2025/04/zajecia-dodatkowe-pozalekcyjne-dla-dziec-gdansk-585x390.jpg',
      tag: 'Education',
      title: 'Extracurricular activities for children in Gdańsk',
      date: 'April 30, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2021/06/Obowiazki-domowe-dziecka-dlaczego-dzieci-powinny-pomagac-w-domu-585x390.jpg',
      tag: 'Education',
      title: 'Should children help around the house?',
      date: 'April 16, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2017/09/nauka-angielkiego-w-domu-obowiazki-dzieci-sprzatanie-585x390.jpg',
      tag: 'Creative learning',
      title: "Learning English at home and daily duties…",
      date: 'April 15, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2022/02/Obowiazki-dziecka-–-czy-wiesz-dlaczego-sa-wazne-1-585x390.jpg',
      tag: 'Education',
      title: 'Child Responsibilities at Home: How to Demystify Them…',
      date: 'April 13, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2025/04/anglicyzmy-zapozyczenia-z-jezyka-angielskiego-585x390.jpg',
      tag: 'Creative learning',
      title: 'Anglicisms – borrowings from English. Definition, examples',
      date: 'April 3, 2025',
      link: ''
    },
    {
      image: 'https://earlystage.pl/blog/wp-content/uploads/2025/03/przebodzcowane-dziecko-jak-wyciszyc-przestymulowane-dziecko-585x390.jpg',
      tag: 'Education',
      title: 'How to Calm Down an Overstimulated Child?',
      date: 'March 21, 2025',
      link: ''
    },
  ];
  learning = [
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2025/06/nowy-podrecznik-dla-uczniow-early-stage-upside-down-1-585x390.png",
      title: "Upside Down by Early Stage: A New, Crazy…",
      date: "June 17, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2022/01/Zajecia-pozalekcyjne-dla-dzieci-–-jak-wybrac-odpowiednie-585x390.jpg",
      title: "Extracurricular Activities for Children – How to Choose…",
      date: "June 2, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2023/05/angielski-dla-dzieci-napisz-na-kurs-przed-wakacjami-585x390.jpg",
      title: "Why is it worth considering additional English before…",
      date: "June 1, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2025/06/conditionals-zdania-warunkowe-angielski-1-2-3-mixed-585x390.jpg",
      title: "Conditionals, or conditional sentences in English",
      date: "May 31, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2024/12/rymowanki-po-angielsku-dla-dzieci-585x390.jpg",
      title: "Nursery rhymes for kids to learn English",
      date: "May 29, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2022/04/6-wiosennych-zabaw-dla-dzieci-z-angielskim-w-tle-585x390.jpg",
      title: "6 Spring Activities for Kids with English…",
      date: "May 21, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2025/05/present-perfect-continuous-zasady-przyklady-zadania-585x390.jpg",
      title: "Present Perfect Continuous – structure and use",
      date: "May 19, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2024/05/test-poziomujacy-z-angielskiego-585x390.jpg",
      title: "English Leveling Meeting – What, How…",
      date: "May 18, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2021/03/Czy-muzyka-pomaga-w-nauce--585x390.jpg",
      title: "Does Music Help You Learn? How Music…",
      date: "May 15, 2025",
      link: ""
    },
    {
      tag: "Creative learning",
      image: "https://earlystage.pl/blog/wp-content/uploads/2025/05/rozprawka-po-angielsku-for-and-against-essay-585x390.jpg",
      title: "How to write an essay in English? For and…",
      date: "May 12, 2025",
      link: ""
    }
  ];
  Interestingplaces = [
    {
      title: "Summer camps for children Play to Grow….",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2024/04/polkolonie-letnie-dla-dzieci-early-stage-play-to-grow-585x390.jpg",
      date: "April 15, 2025",
      tag: "Interesting places"
    },
    {
      title: "Winter camp, winter camp or family trip? What…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2025/01/ferie-zimowe-2025-585x390.jpg",
      date: "January 7, 2025",
      tag: "Interesting places"
    },
    {
      title: "The most interesting mountain routes with children",
      link: "", image: "https://earlystage.pl/blog/wp-content/uploads/2021/12/gorskie-trasy-z-dziecmi-585x390.jpg",
      date: "December 16, 2024",
      tag: "Interesting places"
    },
    {
      title: "Mountains in Winter with a Child – What is Worth…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2021/12/Gory-zima-z-dzieckiem-–-co-warto-ze-soba-zabrac-2-585x390.jpg",
      date: "December 12, 2024",
      tag: "Interesting places"
    },
    {
      title: "Winter break – ideas for winter activities…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2022/01/Ferie-zimowe-–-pomysly-na-zimowe-aktywnosci-z-dziecmi-585x390.jpg",
      date: "December 4, 2024",
      tag: "Interesting places"
    },
    {
      title: "How to organize your child's vacation at home and…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2022/07/Jak-zorganizowac-dziecku-czas-wolny-latem-585x390.jpg",
      date: "July 3, 2024",
      tag: "Interesting places"
    },
    {
      title: "May Day with Children – Interesting Ideas for…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2022/04/Majowka-z-dziecmi-–-ciekawe-sposoby-na-rodzinny-odpoczynek-585x390.jpg",
      date: "April 1, 2024",
      tag: "Interesting places"
    },
    {
      title: "School in Poland and school in Thailand…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2023/11/Szkola-w-Tajlandii-worldschooling-585x390.jpg",
      date: "October 26, 2023",
      tag: "Interesting places"
    },
    {
      title: "Autumn walk with a child – 5 tips…",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2023/09/OlinkittleAdventures_chodznadwor_1-585x390.jpg",
      date: "September 28, 2023",
      tag: "Interesting places"
    },
    {
      title: "Top 5 places to visit in England",
      link: "",
      image: "https://earlystage.pl/blog/wp-content/uploads/2023/05/lista-top-5-miejsc-do-zwiedzenia-w-anglii-1-585x390.jpg",
      date: "May 2, 2023",
      tag: "Interesting places"
    }
  ];
}
