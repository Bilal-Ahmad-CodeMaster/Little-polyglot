import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';

@Component({
  selector: 'app-blogs-header',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './blogs-header.component.html',
  styleUrl: './blogs-header.component.css'
})
export class BlogsHeaderComponent {
  constructor(private api: ApiServicesService, private router: Router) { }

  allBlogs: any[] = [];
  educationBlog: any[] = [];
  creativeBlog: any[] = [];
  interestingPlaces: any[] = [];
  isMenuOpen = false;

  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.allBlogs = Array.isArray(res?.data) ? res.data : [];
      this.educationBlog = this.allBlogs.filter((b: any) => b.category === 'Wychowanie').slice(0, 2);
      this.creativeBlog = this.allBlogs.filter((b: any) => b.category === 'Kreatywna nauka').slice(0, 2);
      this.interestingPlaces = this.allBlogs.filter((b: any) => b.category === 'Ciekawe miejsca').slice(0, 2);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
  }

  onBlogClick(id: string) {
    this.closeMobileMenu();
    this.router.navigate(['/blog', id]);
  }

  getCover(blog: any): string {
    return blog?.imagesGallery?.[0]?.imageUrl || 'public/assets/parent/13.jpeg';
  }
}
