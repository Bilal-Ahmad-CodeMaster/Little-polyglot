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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LanguageConvertorComponent, CommonModule, ForgetPasswordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Polyglot Kids';

  constructor(private router: Router, public loader: LoaderService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    // This is used by Google's script (index.html) as callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };
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
          DE: 'de',
          FR: 'fr',
          PL: 'pl',
          ES: 'es',
          IT: 'it',
          TR: 'tr',
          CN: 'zh-CN',
          JP: 'ja',
          PK: 'ur',
          IN: 'hi',
          RU: 'ru',
        };

        const targetLang = languageMap[countryCode];

        if (targetLang) {
          // Wait 2 seconds to let widget load before triggering translation
          setTimeout(() => {
            this.setGoogleTranslate(targetLang);
          }, 2000);
        }
      });
  }
  
  setGoogleTranslate(lang: string) {
    const maxAttempts = 20;
    let attempts = 0;

    const interval = setInterval(() => {
      const selectEl = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (selectEl) {
        selectEl.value = lang;

        const event = new Event('change', {
          bubbles: true,
          cancelable: true,
        });

        selectEl.dispatchEvent(event);

        console.log('Triggered language change to:', lang);
        clearInterval(interval);
      }

      if (++attempts > maxAttempts) {
        console.warn('Google Translate dropdown not found.');
        clearInterval(interval);
      }
    }, 500);
  }

}
