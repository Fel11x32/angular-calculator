import { Component } from '@angular/core';
import { MyCalculatorComponent } from "./my-calculator/my-calculator.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MyCalculatorComponent]
})
export class AppComponent {

  title = 'my-first-angular-app'; // Поле класса
  tooltip = 'Hello, Angular!';

  showMassage() {
    alert('Hello, Angular!');
  }
}
