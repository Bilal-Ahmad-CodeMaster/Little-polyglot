import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';
import { CommonModule, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiServicesService,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    try {
      const res: any = await this.api.login(this.form.value).toPromise();
      localStorage.setItem('token', res.token);
      setTimeout(() => {
        this.toaster.success('Manual toast test');
      }, 1000);
      this.router.navigate(['/AdminPanel']);

    } catch (err: any) {
      setTimeout(() => {
        console.log("hello");
        this.toaster.success('Manual toast test');
      }, 100);
    } finally {
      this.loading = false;
    }
  }

}





