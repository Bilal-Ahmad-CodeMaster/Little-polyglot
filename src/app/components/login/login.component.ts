import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesService } from '../../services/api-services.service';
import { CommonModule, NgIf } from '@angular/common';
import { SharedServiceService } from '../../services/shared-service.service';

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
    private sharedService: SharedServiceService
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
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('userDetail', JSON.stringify(res.data.data));
      console.log(res);
  
      this.router.navigate(['/adminPanel']);
    } catch (err: any) {

      const errorMsg = err?.error?.message || 'An error occurred';
      console.log(errorMsg);

    } finally {
      this.loading = false;
    }
  }

  openForgetPassword() {
    this.sharedService.openForgetPassword();
  }

}





