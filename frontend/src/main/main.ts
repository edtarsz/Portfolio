import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
  private destroyRef = inject(DestroyRef)

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const helloSub = this.apiService.getHello().subscribe({
      next: (response: any) => {
        this.message = response.message; // To do interfaz //
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Error al cargar el mensaje';
      }
    });

    const campgroundsSub = this.apiService.getCampgrounds().subscribe({
      next: (response: CampgroundDTO[]) => {
        this.campgrounds = response;
      },
      error: (err) => {
        console.error('Error al cargar campgrounds:', err);
        this.campgrounds = [];
      }
    });

    this.destroyRef.onDestroy(() => {
      campgroundsSub.unsubscribe();
      helloSub.unsubscribe();
    });
  }
}
