import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  schoolForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      facility: [''],

      // Common Home Schooling fields
      levelOfStudy: [''],
      facilityAddress: [''],
      facilityLocation: [''],

      // Common Other Facility fields
      institutionType: [''],
      branchNumber: [''],
      facilityName: [''],
      address: [''],
      location: ['']
    });
  }
  isHomeSchoolingSelected(): boolean {
    return this.schoolForm.get('facility')?.value === 'homeschooling';
  }

  isOtherFacilitySelected(): boolean {
    return this.schoolForm.get('facility')?.value === 'facilityOther';
  }
  
  additionalContacts: { phone: string; email: string }[] = [];

  addContact() {
    if (this.additionalContacts.length < 1) {
      this.additionalContacts.push({ phone: '', email: '' });
    }
  }

  removeContact(index: number) {
    this.additionalContacts.splice(index, 1);
  }

  consentMarketing: boolean = false;
  consentDataProcessing: boolean = false;
  consentEmail: boolean = false;
  consentDirectMarketing: boolean = false;

  toggleAllConsents(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.consentMarketing = checked;
    this.consentDataProcessing = checked;
    this.consentEmail = checked;
    this.consentDirectMarketing = checked;
  }
  onSubmit() {
    console.log(this.schoolForm.value);
  }
}