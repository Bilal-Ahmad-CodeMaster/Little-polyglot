import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { BlogsHeaderComponent } from '../../../shared/blogs-header/blogs-header.component';
import { BlogsFooterComponent } from '../../../shared/blogs-footer/blogs-footer.component';

@Component({
  selector: 'app-blog-details-page',
  imports: [CommonModule, RouterLink, BlogsHeaderComponent, BlogsFooterComponent],
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
      });
    }
  }
}
