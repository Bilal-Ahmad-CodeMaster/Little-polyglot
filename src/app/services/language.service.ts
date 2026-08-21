import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppLanguage {
  language: string;
  country: string;
}

export const LANGUAGE_STORAGE_KEY = 'selectedLanguage';
export const DEFAULT_APP_LANGUAGE: AppLanguage = {
  language: 'Polish',
  country: 'Poland',
};

export const LANGUAGE_CODE_MAP: Record<string, string> = {
  Polish: 'pl',
  English: 'en',
  Danish: 'da',
  German: 'de',
  Estonian: 'et',
  Spanish: 'es',
  French: 'fr',
  Croatian: 'hr',
  Italian: 'it',
  Latvian: 'lv',
  Lithuanian: 'lt',
  Hungarian: 'hu',
  Dutch: 'nl',
  Norwegian: 'no',
  Portuguese: 'pt',
  Romanian: 'ro',
  Slovenian: 'sl',
  Finnish: 'fi',
  Swedish: 'sv',
  'Chinese (Simplified)': 'zh-CN',
  Hindi: 'hi',
  Urdu: 'ur',
  Maltese: 'mt',
  Russian: 'ru',
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly current = new BehaviorSubject<AppLanguage>(this.readStored());
  readonly current$ = this.current.asObservable();

  get currentLanguage(): AppLanguage {
    return this.current.value;
  }

  readStored(): AppLanguage {
    try {
      const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.language && parsed?.country && LANGUAGE_CODE_MAP[parsed.language]) {
          return parsed;
        }
      }
    } catch {
      // Ignore invalid stored values and fall back to Polish.
    }

    this.persist(DEFAULT_APP_LANGUAGE);
    return DEFAULT_APP_LANGUAGE;
  }

  setLanguage(language: string, country: string): void {
    const selected: AppLanguage = { language, country };
    this.persist(selected);
    this.current.next(selected);
    window.location.reload();
  }

  private persist(language: AppLanguage): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, JSON.stringify(language));
  }
}
