import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userDetail = JSON.parse(localStorage.getItem('userDetail') || 'null');

  constructor(private api: ApiServicesService, private router: Router) {}

  logout(): void {
    this.api.logout()
      .pipe(
        finalize(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('userDetail');
          this.router.navigate(['/login']);
        })
      )
      .subscribe({
        error: (error) => {
          console.error('Logout failed, clearing local session anyway.', error);
        },
      });
  }
}
