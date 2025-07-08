import { Component, OnInit } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import type { CampgroundDTO } from '@core/models/campground.dto';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [RouterLink],
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
