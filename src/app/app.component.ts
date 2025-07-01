import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LanguageConvertorComponent } from "./modals/language-convertor/language-convertor.component";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}
import { LoaderService } from './services/loader.service';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { SharedServiceService } from './services/shared-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageConvertorComponent, CommonModule, ForgetPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Polyglot Kids';

  constructor(private router: Router, public loader: LoaderService,  private sharedService: SharedServiceService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

  }
onOpen(){
  this.sharedService.openLanguage()
}


}
