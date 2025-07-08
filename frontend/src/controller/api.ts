import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get('http://localhost:3000/');
  }

  getCampgrounds() {
    return this.http.get<ICampgroundDTO[]>('http://localhost:3000/campgrounds');
  }
}