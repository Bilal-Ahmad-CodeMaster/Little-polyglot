import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailJS from '@emailjs/browser';

@Component({
  selector: 'app-blog-contact-us',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './blog-contact-us.component.html',
  styleUrl: './blog-contact-us.component.css'
})
export class BlogContactUsComponent {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      topic: [''],
      message: ['']
    });
  }

  onSubmit(): void {
    console.log(this.contactForm.value);
    if (this.contactForm.invalid) return;



    emailJS
      .send('service_ser1iix', 'template_5a4jc8k', this.contactForm.value, 'qP0eRLo2JQeNXRI7a')
      .then((response) => {
        alert('Email sent successfully!');
        this.contactForm.reset();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send email. Try again later.');
      });
  }
}
