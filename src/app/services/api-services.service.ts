import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
    ;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${API_CONFIG['login']}`, credentials);
  }
  updateProfile(payload: FormData) {
    return this.http.patch(`${API_CONFIG['updateProfile']}`, payload);
  }
  getBranches() {
    return this.http.get(`${API_CONFIG['branches']}`);
  }

  createBranch(payload: FormData) {
    return this.http.post(`${API_CONFIG['branches']}`, payload);
  }

  updateBranch(id: string, payload: FormData) {
    return this.http.put(`${API_CONFIG['branches']}/${id}`, payload);
  }

  deleteBranch(id: string) {
    return this.http.delete(`${API_CONFIG['branches']}/${id}`);
  }

  // Blogs API
  getBlogs() {
    return this.http.get(`${API_CONFIG['blogs']}`);
  }
  getSingleBlogs(id:string) {
    return this.http.get(`${API_CONFIG['blogs']}`);
  }

  createBlog(payload: FormData) {
    return this.http.post(`${API_CONFIG['blogs']}`, payload);
  }

  updateBlog(id: string, payload: FormData) {
    return this.http.put(`${API_CONFIG['blogs']}/${id}`, payload);
  }

  deleteBlog(id: string) {
    return this.http.delete(`${API_CONFIG['blogs']}/${id}`);
  }

  deleteMedia(branchId: string, type: string, mediaId: string) {
    return this.http.delete(`${API_CONFIG['branches']}/${branchId}/${type}/${mediaId}`);
  }
}