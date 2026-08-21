import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-blog-contact-us',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './blog-contact-us.component.html',
  styleUrl: './blog-contact-us.component.css'
})
export class BlogContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  submitSuccess = false;
  formSubmitError: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiServicesService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: [''],
      message: ['']
    });
  }

  onSubmit(): void {
    this.submitSuccess = false;
    this.formSubmitError = null;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.formSubmitError = 'Uzupełnij wymagane pola (imię i adres e-mail).';
      return;
    }

    this.api.sendContactUsMessage(this.contactForm.value).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.contactForm.reset();
      },
      error: (error) => {
        console.error('Contact form error:', error);
        this.formSubmitError = 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.';
      }
    });
  }
}
