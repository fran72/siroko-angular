import { Component, OnInit } from '@angular/core';
import countdown from 'countdown';

interface Time { 
  minutes: number;
  seconds: number;
 }

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit {
  time: any;
  timerId: number | countdown.Timespan = 0;

  constructor() { }

  ngOnInit(): void {
    // let date = new Date('2024-11-31');
    let date = this.activateCountdown();
    this.timerId = countdown(date, (ts) => {
      this.time = ts;
      if (this.time && this.time.minutes <= 0 && this.time.seconds <= 0) {
        clearInterval(this.timerId as number);
        console.log('Time is up!');
      }
      console.log(this.time);
    }, countdown.MINUTES|countdown.SECONDS);

  }

  activateCountdown() {
    var fecha = new Date();
    var sumarsesion = 1;
    // var sumarsesion = 20;
    var resultado = fecha.setMinutes(fecha.getMinutes() + sumarsesion);
    console.log(resultado);
    return new Date(resultado);
  }

//   var timerId =
//   countdown(
//     new Date(),
//     function(ts) {
//       document.getElementById('pageTimer').innerHTML = ts.toHTML("strong");
//     },
//     countdown.HOURS|countdown.MINUTES|countdown.SECONDS);

// // later on this timer may be stopped
// window.clearInterval(timerId);

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId as number);
    }
  }

}
