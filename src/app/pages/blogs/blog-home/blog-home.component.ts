import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.css'
})
export class BlogHomeComponent {
  constructor(private api: ApiServicesService, private router: Router) { }

  blogs: any[] = [];
  featuredBlogs: any[] = [];
  latestBlogs: any[] = [];
  popularBlogs: any[] = [];

  readonly categories = [
    { label: 'Wychowanie', route: '/blogs/education', tone: 'bg-[#f8fbff] border-[#d6ebff]' },
    { label: 'Kreatywna nauka', route: '/blogs/creativeLearning', tone: 'bg-[#fff7f2] border-[#ffd8c7]' },
    { label: 'Ciekawe miejsca', route: '/blogs/interestingPlaces', tone: 'bg-[#fffaf0] border-[#f7dfb8]' },
  ];

  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      const data = Array.isArray(res?.data) ? res.data : [];
      this.blogs = [...data].sort((a: any, b: any) => {
        return new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime();
      });
      this.featuredBlogs = this.blogs.slice(0, 3);
      this.latestBlogs = this.blogs.slice(0, 6);
      this.popularBlogs = this.blogs.slice(0, 4);
    });
  }

  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }

  getCover(blog: any): string {
    return blog?.imagesGallery?.[0]?.imageUrl || 'public/assets/parent/13.jpeg';
  }
}
