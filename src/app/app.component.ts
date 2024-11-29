import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
// import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'siroko-angular';

  questions = [ 'siroko-angular', 'siroko-angular','siroko-angular','siroko-angular','siroko-angular','siroko-angular','siroko-angular','siroko-angular','siroko-angular' ];
}
