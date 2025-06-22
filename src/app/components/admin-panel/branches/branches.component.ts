import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent implements OnInit {
  branches: any[] = [];
  filteredBranches: any[] = [];
  searchForm!: FormGroup;
  branchForm!: FormGroup;

  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;

  showModal = false;
  isEditMode = false;
  editingBranchId: string | null = null;

  currentStep = 0;
  steps = ['Contact Details', 'School Details', 'Franchise Details', 'Media Upload'];

  imagePreviews: string[] = [];
  videoPreviews: string[] = [];
  selectedImages: File[] = [];
  selectedVideos: File[] = [];

  constructor(
    private fb: FormBuilder,
    private api: ApiServicesService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.initBranchForm();
    this.loadBranches();
  }

  initBranchForm(): void {
    this.branchForm = this.fb.group({
      // Step 1
      branchName: ['', Validators.required],
      phone: [''],
      branchLocation: [''],
      email: [''],
      address: [''],
      googleLocation: [''],

      // Step 2
      schoolTitle: [''],
      schoolEmail: [''],
      schoolAddress: [''],
      contactNo: [''],
      headquarterLocation: [''],
      schoolDescription: [''],
      extraDescription: [''],

      // Step 3
      franchiseName: [''],
      franchiseAddress: [''],
      taxId: [''],
      regon: [''],
      krs: ['']
    });
  }

  loadBranches(): void {
    this.api.getBranches().subscribe(
      (res: any) => {
        this.branches = res.data || [];
        this.applyFilter();
      },
      (error) => {
        console.error('Failed to fetch branches', error);
        this.branches = [];
      }
    );
  }

  applyFilter(): void {
    const keyword = this.searchForm.value.search?.toLowerCase() || '';
    this.filteredBranches = this.branches.filter(branch =>
      (branch?.branchName || '').toLowerCase().includes(keyword) ||
      (branch?.location || '').toLowerCase().includes(keyword) ||
      (branch?.branchContactDetails?.phone || '').includes(keyword)
    );
    this.totalPages = Math.ceil(this.filteredBranches.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedBranches(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBranches.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  addBranch(): void {
    this.isEditMode = false;
    this.branchForm.reset();
    this.currentStep = 0;
    this.imagePreviews = [];
    this.videoPreviews = [];
    this.showModal = true;
  }

  editBranch(branch: any): void {
    this.isEditMode = true;
    this.editingBranchId = branch._id;
    this.branchForm.patchValue({
      ...branch,
      ...branch.branchContactDetails
    });
    this.currentStep = 0;
    this.imagePreviews = [];
    this.videoPreviews = [];
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.branchForm.reset();
    this.editingBranchId = null;
    this.selectedImages = [];
    this.selectedVideos = [];
    this.imagePreviews = [];
    this.videoPreviews = [];
  }

  submitBranch(): void {
    const formValue = this.branchForm.value;

    const formData = new FormData();

    // Required flat fields
    formData.append('name', 'Little Polyglot - ' + (formValue.branchLocation || 'Branch'));
    formData.append('location', formValue.branchLocation);
    formData.append('googleLocation', formValue.googleLocation);

    // Required nested objects as strings
    const branchContactDetails = {
      branchName: formValue.branchName,
      phone: formValue.phone,
      branchLocation: formValue.branchLocation,
      googleLocation: formValue.googleLocation,
      email: formValue.email,
      address: formValue.address,
    };

    const schoolDetail = {
      title: formValue.schoolTitle,
      description: formValue.schoolDescription,
      extraDescription: formValue.extraDescription,
      googleLocation: formValue.googleLocation,
      email: formValue.schoolEmail,
      address: formValue.schoolAddress,
      contactNo: formValue.contactNo,
      headquarterLocation: formValue.headquarterLocation,
    };

    const franchiseDetails = {
      name: formValue.franchiseName,
      Address: formValue.franchiseAddress,
      TaxIdentificationNumber: formValue.taxId,
      REGONNumber: formValue.regon,
      KRSNo: formValue.krs,
    };

    const priceList: never[] = []; // add logic here if needed
    const branchEvents: never[] = []; // add logic here if needed

    formData.append('branchContactDetails', JSON.stringify(branchContactDetails));
    formData.append('schoolDetail', JSON.stringify(schoolDetail));
    formData.append('franchiseDetails', JSON.stringify(franchiseDetails));
    formData.append('priceList', JSON.stringify(priceList));
    formData.append('BranchEvents', JSON.stringify(branchEvents));

    // Files as per backend: imagesGallery[], videosGallery[]
    this.selectedImages.forEach(img => {
      formData.append('imagesGallery', img);
    });

    this.selectedVideos.forEach(vid => {
      formData.append('videosGallery', vid);
    });

    // Create or update
    if (this.isEditMode && this.editingBranchId) {
      this.api.updateBranch(this.editingBranchId, formData).subscribe(() => {
        this.loadBranches();
        this.closeModal();
      });
    } else {
      this.api.createBranch(formData).subscribe(() => {
        this.loadBranches();
        this.closeModal();
      });
    }
  }
  
  deleteBranch(id: string): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.api.deleteBranch(id).subscribe(() => {
        this.loadBranches();
      });
    }
  }

  handleDrop(event: DragEvent, type: 'image' | 'video'): void {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    if (type === 'image') {
      this.onImageSelect({ target: { files } } as any);
    } else {
      this.onVideoSelect({ target: { files } } as any);
    }
  }

  onImageSelect(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedImages.push(...files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.imagePreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  onVideoSelect(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedVideos.push(...files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => this.videoPreviews.push(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
