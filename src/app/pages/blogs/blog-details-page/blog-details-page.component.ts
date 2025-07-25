import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { BlogsHeaderComponent } from "../../../shared/blogs-header/blogs-header.component";

@Component({
  selector: 'app-blog-details-page',
  imports: [CommonModule, BlogsHeaderComponent],
  templateUrl: './blog-details-page.component.html',
  styleUrl: './blog-details-page.component.css'
})
export class BlogDetailsPageComponent {
  blog: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiServicesService
  ) { }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.api.getBlogById(blogId).subscribe((res: any) => {
        this.blog = res?.data;
        console.log(this.blog)
      });
    }
  }
}