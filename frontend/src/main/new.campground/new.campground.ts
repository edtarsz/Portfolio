import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '@core/services/api.service';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './new.campground.html',
  styleUrl: './new.campground.css'
})
export class NewCampground implements OnInit {
  campForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.campForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.campForm.valid) {
      this.apiService.addCampground(this.campForm.value).subscribe({
        next: (response) => {
          console.log('Campground added successfully:', response);
          this.campForm.reset();

          this.router.navigate(['/campgrounds']);
        },
        error: (err) => {
          console.error('Error adding campground:', err);
        }
      });
    }
  }
}
