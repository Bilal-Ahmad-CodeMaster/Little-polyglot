// sign-up.component.ts
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import emailJS from '@emailjs/browser';
import { ApiServicesService } from '../../../services/api-services.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getCourseLanguageLabel } from '../../../constants/course-language';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgFor],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registrationForm: FormGroup;
  isAsideOpen: boolean = false;
  BrachData: any
  isContactModalOpen: any;
  isLocationModalOpen: any;
  contactDetail: any;
  globalIframeSrc: any;
  openIndex: number | null = null;
  formSubmitError: string | null = null;
  submitSuccess: boolean = false;

  accordionItems: any

  getLanguageLabel(code?: string): string {
    return getCourseLanguageLabel(code);
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private api: ApiServicesService, private sanitizer: DomSanitizer) {
    this.registrationForm = this.fb.group({
      studentData: this.fb.group({
        studentName1: ['', Validators.required],
        studentName2: [''],
        yearOfBirth: ['', Validators.required],
        facility: ['', Validators.required],
        // Home schooling fields
        levelOfStudy: [''],
        facilityAddress: [''],
        facilityLocation: [''],
        // Other facility fields
        institutionType: [''],
        branchNumber: [''],
        facilityName: [''],
        address: [''],
        location: [''],
        title: ['Signing Up'],
      }),
      parentData: this.fb.group({
        parentPhone: ['', [Validators.required, Validators.pattern('[0-9]{9,15}')]],
        parentEmail: ['', [Validators.required, Validators.email]],
        additionalContacts: this.fb.array([])
      }),
      comment: [''],
      consents: this.fb.group({
        consentMarketing: [false],
        consentDataProcessing: [false],
        consentEmail: [false],
        consentDirectMarketing: [false]
      })
    });

    this.route.queryParams.subscribe(params => {
      const branchId = params['branchId'];
      console.log('Selected branchId:', branchId);
      if (branchId) {
        this.api.getSingleBranch(branchId).subscribe(
          (branch: any) => {
            this.BrachData = branch.data;
            this.accordionItems = this.BrachData.priceList[0].groups;
            this.contactDetail = branch.data.contactInfo;
            let rawUrl = '';
            const match = this.BrachData.googleLocation.match(/src="([^"]+)"/);
            if (match && match[1]) {
              rawUrl = match[1];
            }
            this.globalIframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
          },
          (error) => {
            console.error('Error fetching branch:', error);
          }
        );
      }

    });

  }

  // Getters for nested form groups
  get studentData(): FormGroup {
    return this.registrationForm.get('studentData') as FormGroup;
  }

  get parentData(): FormGroup {
    return this.registrationForm.get('parentData') as FormGroup;
  }

  get consents(): FormGroup {
    return this.registrationForm.get('consents') as FormGroup;
  }

  get additionalContacts(): FormArray {
    return this.parentData.get('additionalContacts') as FormArray;
  }

  // Facility type checks
  isHomeSchoolingSelected(): boolean {
    return this.studentData.get('facility')?.value === 'homeschooling';
  }

  isOtherFacilitySelected(): boolean {
    return this.studentData.get('facility')?.value === 'facilityOther';
  }

  // Contact management
  addContact(): void {
    if (this.additionalContacts.length < 1) {
      this.additionalContacts.push(this.fb.group({
        phone: ['', [Validators.pattern('[0-9]{9,15}')]],
        email: ['', Validators.email]
      }));
    }
  }

  removeContact(index: number): void {
    this.additionalContacts.removeAt(index);
  }

  // Consent management
  toggleAllConsents(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.consents.patchValue({
      consentMarketing: checked,
      consentDataProcessing: checked,
      consentEmail: checked,
      consentDirectMarketing: checked
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.formSubmitError = null;
      const formValues = this.registrationForm.value;

      // Helper to replace empty values with "Not Provided"
      const sanitize = (value: any): string =>
        value !== undefined && value !== null && value !== '' ? value : 'Not Provided';

      const params = {
        // Student Info
        branch: sanitize(this.BrachData?.schoolDetail?.branchName),

        studentName1: sanitize(formValues.studentData.studentName1),
        studentName2: sanitize(formValues.studentData.studentName2),
        yearOfBirth: sanitize(formValues.studentData.yearOfBirth),
        facility: sanitize(formValues.studentData.facility),
        levelOfStudy: sanitize(formValues.studentData.levelOfStudy),
        facilityAddress: sanitize(formValues.studentData.facilityAddress),
        facilityLocation: sanitize(formValues.studentData.facilityLocation),
        institutionType: sanitize(formValues.studentData.institutionType),
        branchNumber: sanitize(formValues.studentData.branchNumber),
        facilityName: sanitize(formValues.studentData.facilityName),
        address: sanitize(formValues.studentData.address),
        location: sanitize(formValues.studentData.location),
        title: sanitize(formValues.studentData.title),

        // Parent Info
        parentPhone: sanitize(formValues.parentData.parentPhone),
        parentEmail: sanitize(formValues.parentData.parentEmail),
        additionalContacts: (formValues.parentData.additionalContacts || [])
          .map((contact: { name?: string; phone?: string }) => {
            const name = sanitize(contact.name);
            const phone = sanitize(contact.phone);
            return `Name: ${name}, Phone: ${phone}`;
          })
          .join(' | ') || 'Not Provided',

        // Comment
        comment: sanitize(formValues.comment),

        // Consents (converted to Yes/No or full text)
        consentMarketing: formValues.consents.consentMarketing
          ? 'Yes, I consent to marketing'
          : 'No',
        consentDataProcessing: formValues.consents.consentDataProcessing
          ? 'Yes, I consent to the processing of my personal data by Polyglot Kids, i.e. name, surname, e-mail address and telephone number – for the purposes of marketing Polyglot Kids\'s own products and services.'
          : 'No',
        consentEmail: formValues.consents.consentEmail
          ? 'Yes, I consent to receiving Polyglot Kids marketing information via e-mail to the e-mail address and telephone number provided by me.'
          : 'No',
        consentDirectMarketing: formValues.consents.consentDirectMarketing
          ? 'Yes, I consent to Polyglot Kids sending me direct marketing using telecommunications terminal equipment (telephone, tablet, computer connected to the Internet) to the telephone number and e-mail address provided by me.'
          : 'No',

        // Timestamp
        time: new Date().toLocaleString()
      };

      // Send Email
      emailJS
        .send('service_ser1iix', 'template_5a4jc8k', params, 'qP0eRLo2JQeNXRI7a')
        .then((response) => {
          console.log('✅ Email sent successfully:', response);
          this.submitSuccess = true;
          this.registrationForm.reset();
          this.scrollToElement('.form-status-banner');
        })
        .catch((error) => {
          console.error('❌ Error sending email:', error);
          this.formSubmitError = 'Nie udało się wysłać zgłoszenia. Spróbuj ponownie za chwilę lub skontaktuj się z nami telefonicznie.';
          this.scrollToElement('.form-status-banner');
        });

      console.log('Form Data:', formValues);
    } else {
      this.submitSuccess = false;
      this.registrationForm.markAllAsTouched();
      this.formSubmitError = 'Formularz zawiera błędy. Sprawdź podświetlone pola poniżej i uzupełnij je poprawnie.';
      this.scrollToFirstInvalidControl();
    }
  }

  private scrollToElement(selector: string): void {
    setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  private scrollToFirstInvalidControl(): void {
    // Wait a tick so Angular has applied the ng-invalid/ng-touched classes
    // to the DOM before we go looking for them.
    setTimeout(() => {
      const firstInvalid = document.querySelector(
        'form .ng-invalid[formControlName], form .ng-invalid[formGroupName]'
      ) as HTMLElement | null;

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus?.();
      } else {
        document.querySelector('.form-status-banner')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }



  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }



}