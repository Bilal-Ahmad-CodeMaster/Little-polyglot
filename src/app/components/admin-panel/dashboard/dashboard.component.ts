
import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userDetail = JSON.parse(localStorage.getItem('userDetail') || 'null');
  branchCount: number = 0;
  blogs: any;

  constructor(private api: ApiServicesService) { }

  ngOnInit(): void {

    this.fetchBlogs()
    this.api.getBranches().subscribe(
      (res: any) => {
        this.branchCount = res.data.length
      },
      (error) => {
        console.error('Failed to fetch branches', error);
        this.branchCount = 0;
      }
    );
  }
  fetchBlogs(): void {
    this.api.getBlogs().subscribe((res: any) => {
      this.blogs = res.data.length;

    });
  }
}
