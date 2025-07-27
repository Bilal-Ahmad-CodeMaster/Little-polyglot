import { Component } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-creative-learning',
  imports: [CommonModule, RouterLink],
  templateUrl: './creative-learning.component.html',
  styleUrl: './creative-learning.component.css'
})
export class CreativeLearningComponent {
  constructor(private api: ApiServicesService, private router: Router) { }
  allBlogs: any
  ngOnInit() {
    this.api.getBlogs().subscribe((res: any) => {
      this.allBlogs = res.data.filter((b: any) => b.category === 'Kreatywna nauka')

    })
  }

  onBlogClick(id: string) {
    this.router.navigate(['/blog', id]);
  }
}
