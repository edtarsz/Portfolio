import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampgroundDTO, ICampgroundDTO } from '../models/campground.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getHello() {
    return this.http.get('http://localhost:3000/');
  }

  getCampgrounds() {
    return this.http.get<CampgroundDTO[]>('http://localhost:3000/campgrounds');
  }

  getCampgroundById(id: string) {
    return this.http.get<CampgroundDTO>(`http://localhost:3000/campgrounds/${id}`);
  }
}