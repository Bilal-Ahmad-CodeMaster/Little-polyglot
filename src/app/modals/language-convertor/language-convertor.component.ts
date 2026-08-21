import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from '../../services/shared-service.service';
import {
  AppLanguage,
  LANGUAGE_CODE_MAP,
  LanguageService,
} from '../../services/language.service';

@Component({
  selector: 'app-language-convertor',
  imports: [CommonModule, NgIf],
  templateUrl: './language-convertor.component.html',
  styleUrl: './language-convertor.component.css',
})
export class LanguageConvertorComponent implements OnInit {
  selectedLanguage: AppLanguage;
  searchQuery = '';
  language = true;
  LanguageModalOpen = false;

  langList: AppLanguage[] = [
    { language: 'Polish', country: 'Poland' },
    { language: 'English', country: 'United States' },
    { language: 'Danish', country: 'Denmark' },
    { language: 'German', country: 'Austria' },
    { language: 'German', country: 'Switzerland' },
    { language: 'German', country: 'Germany' },
    { language: 'Estonian', country: 'Estonia' },
    { language: 'English', country: 'United Arab Emirates' },
    { language: 'English', country: 'Australia' },
    { language: 'English', country: 'Canada' },
    { language: 'English', country: 'Cyprus' },
    { language: 'English', country: 'Malta' },
    { language: 'English', country: 'Egypt' },
    { language: 'English', country: 'Ireland' },
    { language: 'English', country: 'Iceland' },
    { language: 'English', country: 'New Zealand' },
    { language: 'English', country: 'Saudi Arabia' },
    { language: 'English', country: 'Singapore' },
    { language: 'English', country: 'United Kingdom' },
    { language: 'English', country: 'South Africa' },
    { language: 'Spanish', country: 'Argentina' },
    { language: 'Spanish', country: 'Chile' },
    { language: 'Spanish', country: 'Colombia' },
    { language: 'Spanish', country: 'United States' },
    { language: 'Spanish', country: 'Costa Rica' },
    { language: 'Spanish', country: 'Spain' },
    { language: 'Spanish', country: 'Mexico' },
    { language: 'Spanish', country: 'Panama' },
    { language: 'French', country: 'Belgium' },
    { language: 'French', country: 'Canada' },
    { language: 'French', country: 'Switzerland' },
    { language: 'French', country: 'Guadeloupe' },
    { language: 'French', country: 'Morocco' },
    { language: 'French', country: 'France' },
    { language: 'Croatian', country: 'Croatia' },
    { language: 'Italian', country: 'Italy' },
    { language: 'Latvian', country: 'Latvia' },
    { language: 'Lithuanian', country: 'Lithuania' },
    { language: 'Hungarian', country: 'Hungary' },
    { language: 'Dutch', country: 'Belgium' },
    { language: 'Dutch', country: 'Netherlands' },
    { language: 'Norwegian', country: 'Norway' },
    { language: 'Portuguese', country: 'Brazil' },
    { language: 'Portuguese', country: 'Portugal' },
    { language: 'Romanian', country: 'Romania' },
    { language: 'Slovenian', country: 'Slovenia' },
    { language: 'Finnish', country: 'Finland' },
    { language: 'Swedish', country: 'Sweden' },
    { language: 'Chinese (Simplified)', country: 'China' },
    { language: 'Hindi', country: 'India' },
    { language: 'Urdu', country: 'Pakistan' },
    { language: 'Maltese', country: 'Malta' },
    { language: 'Russian', country: 'Russia' },
  ];

  languageCodeMap = LANGUAGE_CODE_MAP;

  constructor(
    private shared: SharedServiceService,
    private languageService: LanguageService
  ) {
    this.selectedLanguage = this.languageService.currentLanguage;
  }

  ngOnInit(): void {
    this.selectedLanguage = this.languageService.readStored();

    this.shared.languageConvert$.subscribe((isOpen) => {
      this.LanguageModalOpen = !!isOpen;
    });
  }

  closeModal() {
    this.LanguageModalOpen = false;
    this.shared.closeLanguage();
  }

  isLangSelected(list: AppLanguage) {
    return (
      list.language.trim() === this.selectedLanguage.language.trim() &&
      list.country.trim() === this.selectedLanguage.country.trim()
    );
  }

  get filteredLangList() {
    let filtered = this.langList.filter(
      (item) =>
        item.language.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (this.selectedLanguage.language !== 'English') {
      filtered = filtered.filter(
        (item) =>
          !(item.language === 'English' && item.country === 'United States')
      );
    }

    const selectedIndex = filtered.findIndex((item) => this.isLangSelected(item));
    if (selectedIndex > -1) {
      const [selectedItem] = filtered.splice(selectedIndex, 1);
      filtered.unshift(selectedItem);
    }

    return filtered;
  }

  selectLanguage(language: string, country: string) {
    this.LanguageModalOpen = false;
    this.languageService.setLanguage(language, country);
  }
}
