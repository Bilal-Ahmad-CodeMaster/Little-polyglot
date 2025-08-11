import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  imports: [CommonModule, NgFor, ReactiveFormsModule, NgIf],
  standalone: true
})
export class BlogsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  blogs: any[] = [];
  paginatedBlogs: any[] = [];
  searchForm!: FormGroup;
  blogForm!: FormGroup;
  showModal = false;
  isEditMode = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  editingBlogId: string | null = null;

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];
  existingImageUrls: any[] = [];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiServicesService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      subTitle: [''],
      category: ['Wychowanie', Validators.required],
      description: ['', Validators.required],
      subDescription: [''],
      imagesGallery: [null]
    });

    this.fetchBlogs();
  }

  onImageChange(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
        this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeNewImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  removeExistingImage(url: any): void {
    this.existingImageUrls = this.existingImageUrls.filter(img => img !== url);
  }

  submitBlog(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    this.loading = true;

    const formData = new FormData();
    formData.append('title', this.blogForm.value.title);
    formData.append('subTitle', this.blogForm.value.subTitle || '');
    formData.append('category', this.blogForm.value.category);
    formData.append('description', this.blogForm.value.description);
    formData.append('subDescription', this.blogForm.value.subDescription || '');
    formData.append(
      'existingImageUrls',
      JSON.stringify(this.existingImageUrls.map(img => typeof img === 'string' ? img : img.imageUrl))
    );
    for (let file of this.selectedFiles) {
      formData.append('imagesGallery', file, file.name);
    }

    const request$ = this.isEditMode && this.editingBlogId
      ? this.api.updateBlog(this.editingBlogId, formData)
      : this.api.createBlog(formData);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.closeModal();
        this.fetchBlogs();
      },
      error: (err) => {
        console.error('Blog save error', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const filtered = this.applySearch(this.blogs);
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedBlogs = filtered.slice(start, end);
  }

  applyFilter(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  applySearch(blogs: any[]): any[] {
    const keyword = (this.searchForm.value.search || '').toLowerCase();
    return blogs.filter(blog =>
      blog.title?.toLowerCase().includes(keyword) ||
      blog.category?.toLowerCase().includes(keyword)
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  deleteBlog(id: string): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.api.deleteBlog(id).subscribe(() => this.fetchBlogs());
    }
  }

  addBlog(): void {
    this.resetFormState();
    setTimeout(() => {
      this.showModal = true;
      this.cd.detectChanges();
    });
    this.isEditMode = false
    this.closeModal()

  }

  openEdit(blog: any): void {
    this.resetFormState();
    this.isEditMode = true;
    this.editingBlogId = blog._id || blog.id || null;
    this.blogForm.patchValue({
      title: blog.title || '',
      subTitle: blog.subTitle || '',
      category: blog.category || 'Wychowanie',
      description: blog.description || '',
      subDescription: blog.subDescription || ''
    });
    this.existingImageUrls = blog.imagesGallery || [];
    console.log(this.existingImageUrls);
    setTimeout(() => {
      this.showModal = true;
      this.cd.detectChanges();
    });

  }

  closeModal(): void {
    this.showModal = false;
    this.resetFormState();
  }

  resetFormState(): void {
    this.blogForm.reset({ category: 'Wychowanie' });
    this.blogForm.markAsPristine();
    this.blogForm.markAsUntouched();
    this.loading = false;
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.existingImageUrls = [];
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  fetchBlogs(): void {
    this.api.getBlogs().subscribe((res: any) => {
      this.blogs = res.data;
      this.updatePagination();
      this.cd.detectChanges();
    });
  }
}
