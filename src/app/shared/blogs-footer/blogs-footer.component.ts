import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs-footer',
  imports: [RouterLink],
  templateUrl: './blogs-footer.component.html',
  styleUrl: './blogs-footer.component.css'
})
export class BlogsFooterComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
