import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog-contact-us',
  imports: [FormsModule],
  templateUrl: './blog-contact-us.component.html',
  styleUrl: './blog-contact-us.component.css'
})
export class BlogContactUsComponent {
  onSubmit() {
    console.log("submitted")
  }
}
