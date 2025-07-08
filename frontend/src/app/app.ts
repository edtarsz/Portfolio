import { Component } from '@angular/core';
import { Header } from "@shared/header/header";
import { Footer } from "@shared/footer/footer";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
