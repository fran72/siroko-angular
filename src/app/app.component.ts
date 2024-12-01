import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import countdown from 'countdown';

interface Time { 
  minutes: number;
  seconds: number;
 }
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatRadioModule, CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  time: any;
  timerId: number | countdown.Timespan = 0;

  step: number = 0;

  selectedOption: string = '2016';
  selectedWizardStep0: string = '';
  selectedWizardStep1: string = '';

  code: string = '';

  stepOptions = [
    {id: 0, title: 'PASO 1 DE 2'},
    {id: 1, title: 'PASO 2 DE 2'},
    {id: 2, title: 'TU PREMIO ESTÁ LISTO'},
  ];

  titleOptions = [
    {id: 0, title: '¡VAMOS ALLÁ!'},
    {id: 1, title: 'VAMOS, UNA MÁS'},
    {id: 2, title: '¡ENHORABUENA!'},
  ];

  wizardOptions = [
    {id: 0, questions: [ '2016', '2017', '2018', '2019', '2020', '2021' ]},
    {id: 1, questions: [ 'Segaría a navaja', 'Rechazaría un cachopo', 'Renunciaría a mis tierras', 'Regalaría una ternera' ]},
  ];

  countDownActivated: boolean = false;
  countDownFinished: boolean = false;

  ngOnInit() {
    if (this.step === 0) this.selectedOption = this.wizardOptions[this.step].questions[0];
    console.log('this.step', this.step);
    console.log('this.selectedOption', this.selectedOption);
  }
  
  setStep(step: number) {
    this.step = step;
    if (this.step < 2) this.selectedOption = this.wizardOptions[this.step].questions[0];

    if (step === 2) {
      this.generateCode();
    }
  }

  onSelect(option: string){
    console.log('onSelect');
    this.selectedOption = option;

    if (this.step === 0) {
      this.selectedWizardStep0 = Number(+option[option.length-1] + +option[option.length-2]).toString();
      console.log(this.selectedWizardStep0);
    } else { 
      var cleanedString = option.replace(/ /g, '').replace(/a/g, '').replace(/A/g, '');
      this.selectedWizardStep1 = cleanedString.substring(cleanedString.length - 4, cleanedString.length);
      console.log(this.selectedWizardStep1);
    }
  }

  generateCode() {
    this.code = this.selectedWizardStep0 + this.selectedWizardStep1.toUpperCase();
    console.log(this.code);
    
    this.activateCountdown();
  }

  activateCountdown() {
    this.countDownActivated = true;

    var emptyDate = new Date();
    var sumarsesion = 1;
    var settedDate = emptyDate.setMinutes(emptyDate.getMinutes() + sumarsesion);
    var formattedDate = new Date(settedDate);

    this.timerId = countdown(formattedDate, (ts) => {
      this.time = ts;
      if (this.time && this.time.minutes <= 0 && this.time.seconds <= 0) {
        clearInterval(this.timerId as number);
        console.log('Time is up!');
        this.countDownFinished = true;
      }
      console.log(this.time);
    }, countdown.MINUTES|countdown.SECONDS);

    
  }

  async copyCode () {
    try {
      await navigator.clipboard.writeText(this.code);
      console.log('Contenido copiado al portapapeles');
    } catch (err) {
      console.error('Error al copiar: ', err);
    }
  }

  isItemChecked(step: number, question: string) {

    if (step === this.step && question ===  this.selectedOption) {
      console.log('isSelected    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', true);
      return true;
    } else {
      console.log('isNotSelected    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', false);
      return false;
    }
  }

  isSelected(step: number, question: string) {

    if (step === this.step && question ===  this.selectedOption) {
      console.log('isSelected    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', true);
      return true;
    } else {
      console.log('isNotSelected    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', false);
      return false;
    }
  }

  // isChecked(step: number, question: string) {
  //   this.selectedOption = this.wizardOptions[this.step].questions[0];

  //   if (step === this.step && question === this.selectedOption) {
  //     console.log('isChecked    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', true);
  //     return true;
  //   } else {
  //     console.log('isNotChecked    ', step ,' ',  this.step,' ', question ,'....', this.selectedOption ,'....', false);
  //     return false;
  //   }
  // }


  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId as number);
    }
  }


}
