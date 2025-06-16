// sign-up.component.ts
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import emailJS from '@emailjs/browser';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registrationForm: FormGroup;
  isAsideOpen: boolean = false;

  constructor(private fb: FormBuilder) {
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
      const formValues = this.registrationForm.value;

      // Helper to replace empty values with "Not Provided"
      const sanitize = (value: any): string =>
        value !== undefined && value !== null && value !== '' ? value : 'Not Provided';

      const params = {
        // Student Info
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
          ? 'Yes, I consent to the processing of my personal data by Early Stage, i.e. name, surname, e-mail address and telephone number – for the purposes of marketing Early Stage\'s own products and services.'
          : 'No',
        consentEmail: formValues.consents.consentEmail
          ? 'Yes, I consent to receiving Early Stage marketing information via e-mail to the e-mail address and telephone number provided by me.'
          : 'No',
        consentDirectMarketing: formValues.consents.consentDirectMarketing
          ? 'Yes, I consent to Early Stage sending me direct marketing using telecommunications terminal equipment (telephone, tablet, computer connected to the Internet) to the telephone number and e-mail address provided by me.'
          : 'No',

        // Timestamp
        time: new Date().toLocaleString()
      };

      // Send Email
      emailJS
        .send('service_ser1iix', 'template_5a4jc8k', params, 'qP0eRLo2JQeNXRI7a')
        .then((response) => {
          console.log('✅ Email sent successfully:', response);
        })
        .catch((error) => {
          console.error('❌ Error sending email:', error);
        });

      console.log('Form Data:', formValues);
    } else {
      console.warn('⚠️ Form is invalid');
      this.registrationForm.markAllAsTouched();
    }
  }

  openIndex: number | null = null;

  accordionItems = [
    {
      title: 'Kindergarten', cards: [
        {
          title: 'Kids (1xweek)',
          description: 'Classes once a week',
          schedule: '1 x 45 min',
          minutes: '',
          classes: '34 classes',
          price: '220 PLN per month',
          materials: `and PLN 200 for educational materials
(payment in the first month)`
        },
        {
          title: 'Kids (2xweek)',
          description: 'Classes twice a week',
          schedule: '2 x 45 min',
          minutes: '',
          classes: '66 classes',
          price: '290 PLN per month',
          materials: `and PLN 200 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '1st class', cards: [
        {
          title: 'Juniors Level 1',
          description: 'Comprehensive English course',
          schedule: '2 x 60 min',
          minutes: ' 120 minutes ',
          classes: '66 classes',
          price: '310 PLN per month',
          materials: `and PLN 218 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '2nd class', cards: [
        {
          title: 'Juniors Level 1',
          description: 'For students starting their studies',
          schedule: '2 x 60 min',
          minutes: '120 minutes',
          classes: '66 classes',
          price: '310 PLN per month',
          materials: `and PLN 218 for educational materials
(payment in the first month)`
        },
        {
          title: 'Juniors Level 2',
          description: 'For students continuing their education',
          schedule: '2 x 90 min',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: `and PLN 188 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '3-6th grade', cards: [
        {
          title: 'Juniors & Teens',
          description: 'Comprehensive English course',
          schedule: '2 x 90 ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: `and PLN 178-300 for educational materials
(payment in the first month)`
        },

      ], isOpen: false
    },
    {
      title: '7th grade', cards: [
        {
          title: 'Teens',
          description: 'Comprehensive course with preparation for the 8th grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: `and PLN 310 for educational materials
(payment in the first month)`
        },
        {
          title: 'Exam Focus',
          description: 'One-year course preparing for the 8th-grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 310 for educational materials (payment in the first month)'
        },

      ], isOpen: false
    },
    {
      title: '8th grade',
      isOpen: false,
      cards: [
        {
          title: 'Exam Focus',
          description: 'One-year course preparing for the 8th-grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },
        {
          title: 'Teens',
          description: 'Comprehensive course with preparation for the 8th grade exam.',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },
        {
          title: 'Pre-First & First',
          description: 'Cambridge Exam Preparation Course',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        }
      ]
    },
    {
      title: 'High school', cards: [
        {
          title: 'Teens',
          description: 'Comprehensive English course',
          schedule: '2 x 90 min ',
          minutes: '180 minutes',
          classes: '66 classes ',
          price: '340 PLN per month',
          materials: 'PLN 320 for educational materials (payment in the first month)'
        },

      ], isOpen: false
    },
  ];

  toggleItem(index: number): void {
    this.accordionItems[index].isOpen = !this.accordionItems[index].isOpen;
  }



}