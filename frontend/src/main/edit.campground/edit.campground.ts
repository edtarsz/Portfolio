import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CampgroundDTO } from '@core/models/campground.dto';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-edit.campground',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit.campground.html',
  styleUrl: './edit.campground.css'
})
export class EditCampground {
  campground!: CampgroundDTO;
  campForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.loadCampground(id);
    });

    this.campForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  loadCampground(id: string) {
    this.apiService.getCampgroundById(id).subscribe({
      next: (response: CampgroundDTO) => {
        this.campground = response;

        this.campForm.patchValue({
          title: this.campground.title,
          location: this.campground.location
        });
      },
    });
  }

  onSubmit() {
    if (this.campForm.valid) {
      // Los 3 puntos (...) spread operator se utilizan para combinar los valores actuales del campground con los nuevos valores del formulario
      // Me encanta que se pueda hacer esto
      const updatedCampground: CampgroundDTO = {
        ...this.campground,
        ...this.campForm.value
      };

      if (!this.campground._id) {
        throw new Error('Campground ID is missing.');
      }

      this.apiService.updateCampground(this.campground._id, updatedCampground).subscribe({
        next: (response: CampgroundDTO) => {
          console.log('Campground updated successfully:', response);
          this.router.navigate(['/campgrounds', response._id]);
        },
        error: (err) => {
          console.error('Error updating campground:', err);
        }
      });
    }
  }
}
