import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesService } from '../../../services/api-services.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  imports: [CommonModule, NgFor, ReactiveFormsModule]
})
export class BlogsComponent implements OnInit {
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
  existingImageUrls: string[] = [];

  constructor(private fb: FormBuilder, private api: ApiServicesService) { }

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

  fetchBlogs(): void {
    this.api.getBlogs().subscribe((res: any) => {
      this.blogs = res.data;
      this.updatePagination();
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
    const keyword = this.searchForm.value.search.toLowerCase();
    return blogs.filter(blog =>
      blog.title.toLowerCase().includes(keyword) ||
      blog.category.toLowerCase().includes(keyword)
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  addBlog(): void {
    this.blogForm.reset({ category: 'Wychowanie' });
    this.isEditMode = false;
    this.editingBlogId = null;
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.existingImageUrls = [];
    this.showModal = true;
  }

  editBlog(blog: any): void {
    this.blogForm.patchValue({
      title: blog.title,
      ubTitle: blog.ubTitle || '',
      category: blog.category,
      description: blog.description,
      subDescription: blog.subDescription || ''
    });

    this.existingImageUrls = blog.imagesGallery?.map((img: any) => img.imageUrl) || [];
    console.log(blog);
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.isEditMode = true;
    this.editingBlogId = blog._id;
    this.showModal = true;
  }

  closeModal(): void {
    this.blogForm.reset();
    this.selectedFiles = [];
    this.imagePreviews = [];
    this.existingImageUrls = [];
    this.showModal = false;
  }

  onImageChange(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  removeNewImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  removeExistingImage(url: string): void {
    this.existingImageUrls = this.existingImageUrls.filter(img => img !== url);
  }

  submitBlog(): void {
    const formData = new FormData();
    formData.append('title', this.blogForm.value.title);
    formData.append('ubTitle', this.blogForm.value.ubTitle || '');
    formData.append('category', this.blogForm.value.category);
    formData.append('description', this.blogForm.value.description);
    formData.append('subDescription', this.blogForm.value.subDescription || '');
    formData.append('existingImageUrls', JSON.stringify(this.existingImageUrls));

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('imagesGallery', this.selectedFiles[i]);
    }

    if (this.isEditMode && this.editingBlogId) {
      this.api.updateBlog(this.editingBlogId, formData).subscribe(() => {
        this.closeModal();
        this.fetchBlogs();
      });
    } else {
      this.api.createBlog(formData).subscribe(() => {
        this.closeModal();
        this.fetchBlogs();
      });
    }
  }

  deleteBlog(id: string): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.api.deleteBlog(id).subscribe(() => this.fetchBlogs());
    }
  }
}