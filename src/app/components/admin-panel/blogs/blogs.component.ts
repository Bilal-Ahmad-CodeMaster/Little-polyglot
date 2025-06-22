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
  imagePreview: string | ArrayBuffer | null | undefined;
imageError: any;

  constructor(private fb: FormBuilder, private api: ApiServicesService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: ['']
    });

    this.blogForm = this.fb.group({
      Title: ['', Validators.required],
      category: ['Wychowanie', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });

    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.api.getBlogs().subscribe((res: any) => {
      this.blogs = res.data;
      console.log(res);
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
      blog.Title.toLowerCase().includes(keyword) ||
      blog.category.toLowerCase().includes(keyword)
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  addBlog(): void {
    this.blogForm.patchValue({
      category: 'Wychowanie',
    });
    this.isEditMode = false;
    this.editingBlogId = null;
    this.imagePreview = null;
    this.showModal = true;
  }

  editBlog(blog: any): void {
    this.blogForm.patchValue({
      Title: blog.Title,
      category: blog.category,
      description: blog.description,
      image: null // reset file input
    });
    this.isEditMode = true;
    this.editingBlogId = blog._id;
    this.imagePreview = blog.image || null;
    this.showModal = true;
  }
  closeModal(): void {
    this.blogForm.reset();
    this.showModal = false;
  }


  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.blogForm.patchValue({ image: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  submitBlog(): void {
    const formData = new FormData();
    formData.append('Title', this.blogForm.value.Title);
    formData.append('category', this.blogForm.value.category);
    formData.append('description', this.blogForm.value.description);
    if (this.blogForm.value.image) {
      formData.append('image', this.blogForm.value.image);
    }

    if (this.isEditMode && this.editingBlogId) {
      this.api.updateBlog(this.editingBlogId, formData).subscribe(() => {
        this.fetchBlogs();
        this.closeModal();
      });
    } else {
      this.api.createBlog(formData).subscribe(() => {
        this.fetchBlogs();
        this.closeModal();
      });
    }
  }

  deleteBlog(id: string): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.api.deleteBlog(id).subscribe(() => this.fetchBlogs());
    }
  }
}