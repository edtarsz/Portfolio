import { Component } from '@angular/core';
import { Main } from "../main/main";
import { Header } from "@shared/header/header";
import { Footer } from "@shared/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Main, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
