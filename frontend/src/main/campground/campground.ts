import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CampgroundDTO } from '@core/models/campground.dto';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-campground',
  imports: [RouterLink],
  templateUrl: './campground.html',
  styleUrl: './campground.css'
})
export class Campground implements OnInit {
  campground!: CampgroundDTO;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
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

  onDeleteCampground(id: string) {
    if (!id) {
      throw new Error('Campground ID is missing.');
    }

    this.apiService.deleteCampground(id).subscribe({
      next: () => {
        console.log('Campground deleted successfully');
        this.router.navigate(['/campgrounds']);
      },
      error: (err) => {
        console.error('Error deleting campground:', err);
      }
    });
  }
}
