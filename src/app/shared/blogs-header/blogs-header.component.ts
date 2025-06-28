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
  allBlogs: any;
  educationBlog: any;
  creativeBlog: any;
  Interestingplaces: any;
  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.allBlogs = res.data;
      this.educationBlog = this.allBlogs.filter((b: any) => b.category === 'Wychowanie');
      this.creativeBlog = this.allBlogs.filter((b: any) => b.category === 'Kreatywna nauka');
      this.Interestingplaces = this.allBlogs.filter((b: any) => b.category === 'Ciekawe miejsca');

    })
  }
  as: boolean = true
  isMenuOpen = false;

  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }

}
