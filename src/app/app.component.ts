import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'siroko-angular';
}
