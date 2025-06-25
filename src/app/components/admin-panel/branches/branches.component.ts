import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  steps = [
    'Basic Info', 'Contact Info', 'School Detail', 'Franchise Details',
    'Price List', 'Branch Event', 'SEO Content Description'
  ];
  imagePreviews: string[] = [];
  videoPreviews: string[] = [];
  selectedImages: File[] = [];
  selectedVideos: File[] = [];
  priceListItemAdded: boolean = false;

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
      // General Info
      streetAddress: ['', Validators.required],
      region: ['', Validators.required],
      city: ['', Validators.required],
      schoolName: ['', Validators.required],
      annotation: [''],
      googleLocation: [''],
      imageGalleryAboutUsDescription: [''],
      // Contact Info
      contactInfo: this.fb.group({
        headmaster: this.fb.group({
          email: [''],
          location: [''],
          phone: ['']
        }),
        headquarter: this.fb.group({
          email: [''],
          location: [''],
          phone: ['']
        })
      }),

      // School Detail
      schoolDetail: this.fb.group({
        titleToShowBranchFor: [''],
        branchName: [''],
        description: [''],
        extraDescription: ['']
      }),

      // Franchise Details
      franchiseDetails: this.fb.group({
        name: [''],
        Address: [''],
        TaxIdentification: [''],
        REGON: [''],
        KRSNo: ['']
      }),

      // Price List
      priceList: this.fb.array([]), // You'll populate this dynamically


      // Extra Info (Modal Texts)
      extraInfoModal: this.fb.array([]) // Array of strings
      ,
      // Events
      BranchEvents: this.fb.array([]), // FormArray of event groups

      // SEO Base Additional Info
      SEOBaseAdditionalInfo: this.fb.array([]), // Same structure as BranchEvents


    });

  }
  get SEOBaseAdditionalInfo(): FormArray {
    return this.branchForm.get('SEOBaseAdditionalInfo') as FormArray;
  }
  createSEOGroup(data?: any): FormGroup {
    return this.fb.group({
      title: [data?.title || ''],
      description: [data?.description || ''],
      subTittle: [data?.subTittle || '']
    });
  }
  addSEOInfo(data?: any) {
    this.SEOBaseAdditionalInfo.push(this.createSEOGroup(data));
  }

  removeSEOInfo(index: number) {
    this.SEOBaseAdditionalInfo.removeAt(index);
  }

  get BranchEvents(): FormArray {
    return this.branchForm.get('BranchEvents') as FormArray;
  }
  createEventGroup(data?: any): FormGroup {
    return this.fb.group({
      title: [data?.title || ''],
      description: [data?.description || ''],
      date: [data?.date || ''],
      extraDescription: [data?.extraDescription || '']
    });
  }

  addBranchEvent(eventData?: any) {
    this.BranchEvents.push(this.createEventGroup(eventData));
  }
  removeBranchEvent(index: number) {
    this.BranchEvents.removeAt(index);
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
  get extraInfoModal(): FormArray {
    return this.branchForm.get('extraInfoModal') as FormArray;
  }
  addExtraInfoModalItem(value: string = '') {
    this.extraInfoModal.push(this.fb.control(value));
  }
  removeExtraInfoModalItem(index: number) {
    this.extraInfoModal.removeAt(index);
  }






  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  addPriceGroup() {
    this.priceListItemAdded = true
    const packageGroup = this.fb.group({
      title: [''],
      description: [''],
      duration: [''],
      durationInMinutes: [''],
      totalClasses: [''],
      pricePerMonth: [''],
      materialsFee: ['']
    });

    const group = this.fb.group({
      label: [''],
      packages: this.fb.array([packageGroup])
    });

    const priceItem = this.fb.group({
      groups: this.fb.array([group])
    });

    (this.branchForm.get('priceList') as FormArray).push(priceItem);
  }
  get priceList() {
    return this.branchForm.get('priceList') as import('@angular/forms').FormArray;
  }
  getGroups(i: number) {
    return (this.branchForm.get('priceList') as FormArray).at(i).get('groups') as FormArray;
  }
  getPackages(priceIndex: number, groupIndex: number) {
    const priceList = this.branchForm.get('priceList') as import('@angular/forms').FormArray;
    const groups = priceList.at(priceIndex).get('groups') as import('@angular/forms').FormArray;
    return groups.at(groupIndex).get('packages') as import('@angular/forms').FormArray;
  }
  // Remove a package from the priceList FormArray
  removePackage(i: number, j: number, k: number): void {
    const priceList = this.branchForm.get('priceList');
    if (priceList && priceList instanceof FormArray) {
      const groups = (priceList as FormArray).at(i).get('groups') as FormArray;
      if (groups && groups.at(j).get('packages')) {
        (groups.at(j).get('packages') as FormArray).removeAt(k);
      }
    }
  }
  addPackage(priceIndex: number, groupIndex: number): void {
    const priceList = this.branchForm.get('priceList') as FormArray;
    if (priceList && priceList.controls && priceList.controls[priceIndex]) {
      const priceItem = priceList.controls[priceIndex];
      const groups = priceItem.get('groups') as FormArray;
      if (groups && groups.controls && groups.controls[groupIndex]) {
        const packages = groups.controls[groupIndex].get('packages') as FormArray;
        if (packages && typeof packages.push === 'function') {
          packages.push(this.fb.group({
            title: [''],
            description: [''],
            duration: [''],
            durationInMinutes: [''],
            totalClasses: [''],
            pricePerMonth: [''],
            materialsFee: ['']
          }));
        }
      }
    }
  }
  removeGroup(priceIndex: number, groupIndex: number): void {
    const priceList = this.branchForm.get('priceList') as FormArray;
    if (priceList && priceList.length > priceIndex) {
      const groups = priceList.at(priceIndex).get('groups') as FormArray;
      if (groups && groups.length > groupIndex) {
        groups.removeAt(groupIndex);
      }
    }
  }
  addGroup(i: number) {
    const priceList = this.branchForm.get('priceList') as import('@angular/forms').FormArray;
    const groups = priceList.at(i).get('groups') as import('@angular/forms').FormArray;
    groups.push(this.fb.group({
      label: [''],
      packages: this.fb.array([])
    }));
  }
  // Remove a price item from the priceList FormArray
  removePriceItem(i: number): void {
    const priceList = this.branchForm.get('priceList') as FormArray;
    if (priceList && typeof priceList.removeAt === 'function') {
      priceList.removeAt(i);
      this.priceListItemAdded = false
    }

  }
  addBranch(): void {
    this.isEditMode = false;
    this.branchForm.reset();
    this.currentStep = 0;
    this.imagePreviews = [];
    this.videoPreviews = [];
    this.showModal = true;
    this.priceListItemAdded = false
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
    this.priceList.clear(); // Clear all price items

    this.priceListItemAdded = false
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
