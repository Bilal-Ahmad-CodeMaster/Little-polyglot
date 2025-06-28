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
  constructor(private api: ApiServicesService, private router:Router) { }
  blogs: any
  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.blogs = res?.data;
      console.log(this.blogs);
    })


  }

  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }


}
