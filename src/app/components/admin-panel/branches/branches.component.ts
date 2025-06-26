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
    'Price List', 'Branch Event', 'SEO Content Description', "extraInfoModal", "image and video gallery"
  ];
  imagePreviews: string[] = [];
  videoPreviews: string[] = [];
  selectedImages: File[] = [];
  selectedVideos: File[] = [];
  priceListItemAdded: boolean = false;
  existingImageUrls: any;
  existingVideoUrls: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiServicesService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.applyFilter(value);
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

  applyFilter(value: string = ''): void {
    const keyword = value.toLowerCase();
    this.filteredBranches = this.branches.filter(branch =>
      (branch?.schoolName || '').toLowerCase().includes(keyword) ||
      (branch?.region || '').toLowerCase().includes(keyword) ||
      (branch?.city || '').toLowerCase().includes(keyword)
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

  addExtraInfo(value: string = '') {
    this.extraInfoModal.push(this.fb.control(value));
  }

  removeExtraInfo(index: number) {
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
  patchBranchForm(branchData: any) {
    this.branchForm.patchValue({
      streetAddress: branchData.streetAddress,
      region: branchData.region,
      city: branchData.city,
      schoolName: branchData.schoolName,
      annotation: branchData.annotation,
      googleLocation: branchData.googleLocation,
      imageGalleryAboutUsDescription: branchData.imageGalleryAboutUsDescription,
      contactInfo: branchData.contactInfo,
      schoolDetail: branchData.schoolDetail,
      franchiseDetails: branchData.franchiseDetails,
    });

    this.patchExtraInfoModal(branchData.extraInfoModal);
    this.patchBranchEvents(branchData.BranchEvents);
    this.patchSEOInfo(branchData.SEOBaseAdditionalInfo);
    this.patchPriceList(branchData.priceList);
  }
  patchExtraInfoModal(infoList: string[]) {
    const control = this.branchForm.get('extraInfoModal') as FormArray;
    control.clear();
    infoList?.forEach(info => {
      control.push(this.fb.control(info));
    });
  }
  patchBranchEvents(events: any[]) {
    const control = this.branchForm.get('BranchEvents') as FormArray;
    control.clear();
    events?.forEach(event => {
      control.push(this.createEventGroup(event));
    });
  }

  patchSEOInfo(seoList: any[]) {
    const control = this.branchForm.get('SEOBaseAdditionalInfo') as FormArray;
    control.clear();
    seoList?.forEach(seo => {
      control.push(this.fb.group({
        title: [seo.title || ''],
        description: [seo.description || ''],
        subTittle: [seo.subTittle || '']
      }));
    });
  }
  patchPriceList(list: any[]) {
    const control = this.branchForm.get('priceList') as FormArray<any>;
    control.clear();

    list?.forEach(item => {
      const groupsArray = this.fb.array([], { validators: [] }) as FormArray<any>;
      item.groups?.forEach((group: any) => {
        const packagesArray = this.fb.array([], { validators: [] }) as FormArray<any>;
        group.packages?.forEach((pkg: any) => {
          packagesArray.push(this.fb.group({
            title: [pkg.title],
            description: [pkg.description],
            duration: [pkg.duration],
            durationInMinutes: [pkg.durationInMinutes],
            totalClasses: [pkg.totalClasses],
            pricePerMonth: [pkg.pricePerMonth],
            materialsFee: [pkg.materialsFee]
          }));
        });

        groupsArray.push(this.fb.group({
          label: [group.label],
          packages: packagesArray
        }));
      });

      control.push(this.fb.group({
        groups: groupsArray
      }));
    });
  }

  editBranch(branch: any) {
    this.isEditMode = true;
    this.editingBranchId = branch._id;

    // Reset form before patching
    this.branchForm.reset();
    this.clearAllFormArrays();

    this.patchBranchForm(branch);  // This will fill all data
    this.patchMediaPreviews(branch); // Handle files if any

    this.showModal = true;
  }
  clearAllFormArrays() {
    (this.branchForm.get('extraInfoModal') as FormArray).clear();
    (this.branchForm.get('BranchEvents') as FormArray).clear();
    (this.branchForm.get('SEOBaseAdditionalInfo') as FormArray).clear();
    (this.branchForm.get('priceList') as FormArray).clear();
  }
  patchMediaPreviews(branchData: any) {
    // Patch from backend data
    this.existingImageUrls = branchData.imagesGallery?.map((img: any) => img.imageUrl) || [];
    this.existingVideoUrls = branchData.videosGallery?.map((vid: any) => vid.videoUrl) || [];

    // Set preview = existing URLs initially
    this.imagePreviews = [...this.existingImageUrls];
    this.videoPreviews = [...this.existingVideoUrls];

    // Clear any previously selected files
    this.selectedImages = [];
    this.selectedVideos = [];
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
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  onVideoSelect(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedVideos.push(...files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoPreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const url = this.imagePreviews[index];

    // Check if it's from existing URLs or just preview
    const existingIndex = this.existingImageUrls.indexOf(url);
    if (existingIndex > -1) {
      this.existingImageUrls.splice(existingIndex, 1); // Remove from existing
    } else {
      this.selectedImages.splice(index - this.existingImageUrls.length, 1); // Adjust for preview offset
    }

    this.imagePreviews.splice(index, 1);
  }


  removeVideo(index: number): void {
    const url = this.videoPreviews[index];

    const existingIndex = this.existingVideoUrls.indexOf(url);
    if (existingIndex > -1) {
      this.existingVideoUrls.splice(existingIndex, 1);
    } else {
      this.selectedVideos.splice(index - this.existingVideoUrls.length, 1);
    }

    this.videoPreviews.splice(index, 1);
  }




  closeModal(): void {
    this.showModal = false;
    this.branchForm.reset();
    this.editingBranchId = null;
    this.selectedImages = [];
    this.selectedVideos = [];
    this.imagePreviews = [];
    this.videoPreviews = [];
    this.priceList.clear();
    this.extraInfoModal.clear()
    this.BranchEvents.clear()
    this.SEOBaseAdditionalInfo.clear()
    this.priceListItemAdded = false
    this.currentStep = 0
  }


  submitBranch() {
    if (this.branchForm.invalid) {
      this.branchForm.markAllAsTouched();
      alert('Branch data is invalid!');
      return;
    }

    const formData = new FormData();
    const payload = this.branchForm.value;

    // Append flat fields
    formData.append('streetAddress', payload.streetAddress);
    formData.append('region', payload.region);
    formData.append('city', payload.city);
    formData.append('schoolName', payload.schoolName);
    formData.append('annotation', payload.annotation || '');
    formData.append('googleLocation', payload.googleLocation || '');
    formData.append('imageGalleryAboutUsDescription', payload.imageGalleryAboutUsDescription || '');

    // Append JSON-stringified fields
    formData.append('contactInfo', JSON.stringify(payload.contactInfo));
    formData.append('schoolDetail', JSON.stringify(payload.schoolDetail));
    formData.append('franchiseDetails', JSON.stringify(payload.franchiseDetails));
    formData.append('BranchEvents', JSON.stringify(payload.BranchEvents || []));
    formData.append('SEOBaseAdditionalInfo', JSON.stringify(payload.SEOBaseAdditionalInfo || []));
    formData.append('extraInfoModal', JSON.stringify(payload.extraInfoModal || []));
    formData.append('priceList', JSON.stringify(payload.priceList || []));

    formData.append('existingImageUrls', JSON.stringify(this.existingImageUrls));
    formData.append('existingVideoUrls', JSON.stringify(this.existingVideoUrls));

    this.selectedImages.forEach(file => {
      formData.append('imagesGallery', file);
    });

    this.selectedVideos.forEach(file => {
      formData.append('videosGallery', file);
    });

    // Submit via API
    const request$ = this.isEditMode && this.editingBranchId
      ? this.api.updateBranch(this.editingBranchId, formData)
      : this.api.createBranch(formData);

    request$.subscribe({
      next: () => {
        alert(`Branch ${this.isEditMode ? 'updated' : 'created'} successfully!`);
        this.closeModal();
        this.loadBranches();
      },
      error: err => {
        console.error(`${this.isEditMode ? 'Update' : 'Creation'} failed`, err);
        alert(`Failed to ${this.isEditMode ? 'update' : 'create'} branch`);
      }
    });
  }


}

