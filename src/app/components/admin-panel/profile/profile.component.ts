import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // ✅ fix typo from "styleUrl"
})
export class ProfileComponent implements OnInit {
  profile: any = JSON.parse(localStorage.getItem('userDetail') || '{}');
  showModal = false;
  editForm!: FormGroup;

  previewUrl: string | null = null;
  imageUploadError: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private api: ApiServicesService) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      username: [this.profile.username, [Validators.required, Validators.minLength(2)]],
      email: [this.profile.email, [Validators.required, Validators.email]]
    });

    this.previewUrl = this.profile.profileUrl;
  }

  openEditModal() {
    this.editForm.patchValue({
      username: this.profile.username,
      email: this.profile.email
    });
    this.previewUrl = this.profile.profileUrl;
    this.imageUploadError = null;
    this.showModal = true;
  }

  cancelEdit() {
    this.showModal = false;
    this.imageUploadError = null;
    this.previewUrl = null;
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) {
      this.imageUploadError = 'No file selected.';
      return;
    }

    const file = fileInput.files[0];

    // Optional: check file type or size if needed
    if (!file.type.startsWith('image/')) {
      this.imageUploadError = 'Selected file is not an image.';
      return;
    }

    this.selectedFile = file;
    this.imageUploadError = null;

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  

  saveProfile() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
console.log(this.editForm.value);
    const formData = new FormData();
    formData.append('username', this.editForm.get('username')?.value);
    formData.append('email', this.editForm.get('email')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile); // ✅ this matches `req.file` on backend
    }
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
    this.api.updateProfile(formData).subscribe({
      next: (response: any) => {
        // Update UI and localStorage
        this.profile = response.data; // assuming `data: updatedUser` is returned
        localStorage.setItem('userDetail', JSON.stringify(this.profile));
        this.previewUrl = this.profile.profileUrl;
        this.showModal = false;
      },
      error: (err) => {
        console.error('Profile update failed:', err);
        this.imageUploadError = err?.error?.message || 'Something went wrong.';
      }
    });
  }
}
