import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../controller/api';
import type { CampgroundDTO } from '../../controller/CampgroundDTO';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  message = '';
  campgrounds: CampgroundDTO[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getHello().subscribe({
      next: (response: any) => {
        this.message = response.message; // To do interfaz //
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Error al cargar el mensaje';
      }
    });

    this.apiService.getCampgrounds().subscribe({
      next: (response: CampgroundDTO[]) => {
        this.campgrounds = response;
      },
      error: (err) => {
        console.error('Error al cargar campgrounds:', err);
        this.campgrounds = [];
      }
    });
  }
}
