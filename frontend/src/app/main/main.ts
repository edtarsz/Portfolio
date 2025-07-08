import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  message = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getHello().subscribe({
      next: (data) => {
        this.message = data; // data es texto plano (no JSON)
      },
      error: (err) => {
        console.error('Error:', err);
        this.message = 'Error al cargar el mensaje';
      }
    });
  }
}
