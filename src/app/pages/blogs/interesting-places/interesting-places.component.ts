import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-interesting-places',
  imports: [CommonModule, RouterLink],
  templateUrl: './interesting-places.component.html',
  styleUrl: './interesting-places.component.css'
})
export class InterestingPlacesComponent {
  constructor(private api: ApiServicesService, private router: Router) { }
  allBlogs: any;
  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.allBlogs = res.data.filter((b: any) => b.category === 'Ciekawe miejsca')
    })
  }
  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }
}
