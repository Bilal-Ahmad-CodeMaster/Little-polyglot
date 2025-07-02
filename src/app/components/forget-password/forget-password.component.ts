import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedServiceService } from '../../services/shared-service.service';
import { ApiServicesService } from '../../services/api-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  constructor(
    private sharedService: SharedServiceService,
    private api: ApiServicesService,
    private toastr: ToastrService
  ) { }

  showModal = false;
  step = 1;
  email = '';
  otp = '';
  newPassword = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  passwordMismatch = false;

  ngOnInit() {
    this.sharedService.forgetPassword$.subscribe((visible) => {
      this.showModal = visible;
    });
  }

  onClose() {
    this.showModal = false;
    this.resetForm();
  }

  sendEmail() {
    if (!this.email) {
      this.toastr.error('Please enter your email');
      return;
    }

    this.api.sendOtp(this.email).subscribe({
      next: () => {
        this.toastr.success('OTP sent to your email');
        this.step = 2;
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Failed to send OTP');
      },
    });
  }

  verifyOtp() {
    if (!this.otp) {
      this.toastr.error('Please enter the OTP');
      return;
    }

    if (!this.newPassword || !this.confirmPassword) {
      this.toastr.error('Please fill in both password fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    const payload = {
      email: this.email,
      otp: this.otp,
      password: this.newPassword,
      confirmPassword: this.confirmPassword,
    };

    this.api.verifyOtpAndResetPassword(payload).subscribe({
      next: () => {
        this.toastr.success('Password reset successfully!');
        this.closeModal();
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'OTP verification failed');
      },
    });
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  resetForm() {
    this.step = 1;
    this.email = '';
    this.otp = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordMismatch = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
