import { Component } from '@angular/core';
import { Main } from "./main/main";
import { Header } from "./header/header";
import { Footer } from "./footer/footer";

@Component({
  selector: 'app-root',
  imports: [Main, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
