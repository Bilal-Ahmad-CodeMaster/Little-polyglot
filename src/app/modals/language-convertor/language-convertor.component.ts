import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
  selector: 'app-language-convertor',
  imports: [CommonModule, NgIf],
  templateUrl: './language-convertor.component.html',
  styleUrl: './language-convertor.component.css'
})
export class LanguageConvertorComponent {

  selectedLanguage = { language: 'Polish', country: 'Poland' };
  searchQuery: string = "";
  currency: boolean = false;
  language: boolean = true;
  isLoading = false;
  LanguageModalOpen = false
  constructor(private shared: SharedServiceService) { }
  ngOnInit(): void {
    this.setSelectedLanguageFromCookie();

    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      this.selectedLanguage = JSON.parse(storedLang);
    } else {
      this.selectedLanguage = { language: "Polish", country: "Poland" };
    }

    this.shared.languageConvert$.subscribe((e) => {
      this.LanguageModalOpen = e;
    });

    if (!document.cookie.includes('langSet=true')) {
      const defaultLangCode = this.languageCodeMap[this.selectedLanguage.language] || 'pl';
      this.setGoogleTranslateCookie(defaultLangCode);
      document.cookie = `langSet=true; path=/; max-age=31536000; SameSite=Lax`;
      location.reload();
    }
  }

  closeModal() {
    this.LanguageModalOpen = false;
  }


  langList = [
    { language: "Polish", country: "Poland" },
    { language: "English", country: "United States" },
    { language: "Danish", country: "Denmark" },
    { language: "German", country: "Austria" },
    { language: "German", country: "Switzerland" },
    { language: "German", country: "Germany" },
    { language: "Estonian", country: "Estonia" },
    { language: "English", country: "United Arab Emirates" },
    { language: "English", country: "Australia" },
    { language: "English", country: "Canada" },
    { language: "English", country: "Cyprus" },
    { language: "English", country: "Malta" },
    { language: "English", country: "Egypt" },
    { language: "English", country: "Ireland" },
    { language: "English", country: "Iceland" },
    { language: "English", country: "New Zealand" },
    { language: "English", country: "Saudi Arabia" },
    { language: "English", country: "Singapore" },
    { language: "English", country: "United Kingdom" },
    { language: "English", country: "South Africa" },
    { language: "Spanish", country: "Argentina" },
    { language: "Spanish", country: "Chile" },
    { language: "Spanish", country: "Colombia" },
    { language: "Spanish", country: "United States" },
    { language: "Spanish", country: "Costa Rica" },
    { language: "Spanish", country: "Spain" },
    { language: "Spanish", country: "Mexico" },
    { language: "Spanish", country: "Panama" },
    { language: "French", country: "Belgium" },
    { language: "French", country: "Canada" },
    { language: "French", country: "Switzerland" },
    { language: "French", country: "Guadeloupe" },
    { language: "French", country: "Morocco" },
    { language: "French", country: "France" },
    { language: "Croatian", country: "Croatia" },
    { language: "Italian", country: "Italy" },
    { language: "Latvian", country: "Latvia" },
    { language: "Lithuanian", country: "Lithuania" },
    { language: "Hungarian", country: "Hungary" },
    { language: "Dutch", country: "Belgium" },
    { language: "Dutch", country: "Netherlands" },
    { language: "Norwegian", country: "Norway" },

    { language: "Portuguese", country: "Brazil" },
    { language: "Portuguese", country: "Portugal" },
    { language: "Romanian", country: "Romania" },
    { language: "Slovenian", country: "Slovenia" },
    { language: "Finnish", country: "Finland" },
    { language: "Swedish", country: "Sweden" },
    { language: "Chinese (Simplified)", country: "China" },
    { language: "Hindi", country: "India" },
    { language: "Urdu", country: "Pakistan" },
    { language: "Maltese", country: "Malta" },
    { language: "Russian", country: "Russia" },
  ];

  languageCodeMap: { [key: string]: string } = {
    "Polish": "pl",
    "English": "en",
    "Danish": "da",
    "German": "de",
    "Estonian": "et",
    "Spanish": "es",
    "French": "fr",
    "Croatian": "hr",
    "Italian": "it",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Hungarian": "hu",
    "Dutch": "nl",
    "Norwegian": "no",

    "Portuguese": "pt",
    "Romanian": "ro",
    "Slovenian": "sl",
    "Finnish": "fi",
    "Swedish": "sv",
    "Chinese (Simplified)": "zh-CN",
    "Hindi": "hi",
    "Urdu": "ur",
    "Maltese": "mt",
    "Russian": "ru"
  };

  isLangSelected(list: { language: string, country: string }) {
    return (
      list.language.trim() === this.selectedLanguage.language.trim() &&
      list.country.trim() === this.selectedLanguage.country.trim()
    );
  }

  get filteredLangList() {
    let filtered = this.langList.filter(item =>
      item.language.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedLanguage.language !== 'English') {
      filtered = filtered.filter(item =>
        !(item.language === 'English' && item.country === 'United States')
      );
    }

    const selectedIndex = filtered.findIndex(item => this.isLangSelected(item));
    if (selectedIndex > -1) {
      const [selectedItem] = filtered.splice(selectedIndex, 1);
      filtered.unshift(selectedItem);
    }

    return filtered;
  }

  selectLanguage(language: string, country: string) {
    this.isLoading = true;
    this.selectedLanguage = { language, country };
    localStorage.setItem('selectedLanguage', JSON.stringify(this.selectedLanguage));

    const langCode = this.languageCodeMap[language];
    if (langCode) {
      this.setGoogleTranslateCookie(langCode);
      this.waitForTranslateDropdown(langCode);
    }
    this.LanguageModalOpen = false;
    setTimeout(() => {
      window.location.reload();
    }, 500);
  
  }

  private setSelectedLanguageFromCookie(): void {
    const match = document.cookie.match(/googtrans=\/[a-zA-Z-]+\/([a-zA-Z-]+)/);
    if (match && match[1]) {
      const langCode = match[1];
      const matchedItem = this.langList.find(item =>
        this.languageCodeMap[item.language] === langCode
      );
      if (matchedItem) {
        this.selectedLanguage = {
          language: matchedItem.language,
          country: matchedItem.country,
        };
      }
    }
  }

  private waitForTranslateDropdown(langCode: string) {
    const interval = setInterval(() => {
      const selectEl = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectEl) {
        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
        clearInterval(interval);

        // Optional: trigger reload softly
        setTimeout(() => {
          const currentPath = window.location.pathname;
          window.location.href = currentPath;
        }, 800);
      }
    }, 200);
  }

  private setGoogleTranslateCookie(langCode: string): void {
    const cookieName = 'googtrans';
    const cookieValue = `/en/${langCode}`;
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
    console.log('Translation cookie set:', langCode);
  }

  onLanguage() {
    this.language = true;

  }


}
