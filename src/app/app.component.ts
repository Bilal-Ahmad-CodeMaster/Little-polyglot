import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ForgetPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Polyglot Kids';
  constructor(private router: Router, public loader: LoaderService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // or just: window.scrollTo(0, 0);
      });
  }

  ngOnInit() {
    this.detectAndTranslate();

  }

  detectAndTranslate() {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code;
        const languageMap: { [key: string]: string } = {
          DE: 'de',   // Germany → German
          FR: 'fr',   // France → French
          PL: 'pl',   // Poland → Polish
          ES: 'es',   // Spain → Spanish
          IT: 'it',   // Italy → Italian
          TR: 'tr',   // Turkey → Turkish
          CN: 'zh-CN',// China → Chinese
          JP: 'ja',   // Japan → Japanese
          PK: 'ur',   // Pakistan → Urdu
          IN: 'hi',   // India → Hindi
          RU: 'ru',   // Russia → Russian
          // Add more as needed
        };

        const targetLang = languageMap[countryCode];
        if (targetLang) {
          this.setGoogleTranslate(targetLang);
        }
      });
  }

  setGoogleTranslate(lang: string) {
    const interval = setInterval(() => {
      const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (selectEl) {
        selectEl.value = lang;
        selectEl.dispatchEvent(new Event('change'));
        clearInterval(interval);
      }
    }, 500);
  }
}