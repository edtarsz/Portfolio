import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampgroundDTO, ICampgroundDTO } from '@core/models/campground.dto';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-campground',
  imports: [],
  templateUrl: './campground.html',
  styleUrl: './campground.css'
})
export class Campground implements OnInit {
  campground!: CampgroundDTO;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadCampground(id);
    });
  }

  loadCampground(id: string) {
    this.apiService.getCampgroundById(id).subscribe({
      next: (response: CampgroundDTO) => {
        this.campground = response;
      },
    });
  }
}
