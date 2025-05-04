import { Component, Input } from '@angular/core';
import { BlogsHeaderComponent } from "../../shared/blogs-header/blogs-header.component";
import { BlogsFooterComponent } from "../../shared/blogs-footer/blogs-footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blogs-layout',
  imports: [BlogsHeaderComponent, BlogsFooterComponent,RouterOutlet],
  templateUrl: './blogs-layout.component.html',
  styleUrl: './blogs-layout.component.css'
})
export class BlogsLayoutComponent {

}
