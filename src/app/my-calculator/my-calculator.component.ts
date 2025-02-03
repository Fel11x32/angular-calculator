import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CalcVariable {
  value: number;
  modifier: string;
  operation?: string;
}

@Component({
  selector: 'app-my-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss',
})
export class MyCalculatorComponent {
  public variables: CalcVariable[] = [
    { value: 1, modifier: 'none' },
    { value: 1, modifier: 'none', operation: '+' },
  ];

  public modifiers: string[] = ['none', 'square', 'cube', 'sin', 'cos'];

  public operations: string[] = ['+', '-', '*', '/'];

  public result?: number;
  public history: string[] = [];

  private applyModifier(value: number, modifier: string): number {
    switch (modifier) {
      case 'square':
        return value * value;
      case 'cube':
        return value * value * value;
      case 'sin':
        return Math.sin(value);
      case 'cos':
        return Math.cos(value);
      default:
        return value;
    }
  }

  public calc(): void {
    if (this.variables.length === 0) {
      this.result = undefined;
      return;
    }

    let computed: number = this.applyModifier(
      this.variables[0].value,
      this.variables[0].modifier
    );
    let historyText: string = this.getDisplayValue(this.variables[0]);

    for (let i = 1; i < this.variables.length; i++) {
      const op: string = this.variables[i].operation || '+';
      const current: number = this.applyModifier(
        this.variables[i].value,
        this.variables[i].modifier
      );
      historyText += ` ${op} ${this.getDisplayValue(this.variables[i])}`;

      switch (op) {
        case '+':
          computed += current;
          break;
        case '-':
          computed -= current;
          break;
        case '*':
          computed *= current;
          break;
        case '/':
          if (current === 0) {
            this.result = NaN;
            this.history.push(`${historyText} = Error (деление на 0)`);
            return;
          }
          computed /= current;
          break;
      }
    }

    this.result = computed;
    this.history.push(`${historyText} = ${this.result}`);
  }

  private getDisplayValue(variable: CalcVariable): string {
    if (variable.modifier !== 'none') {
      return `${variable.modifier}(${variable.value})`;
    }
    return `${variable.value}`;
  }

  public addVariable(): void {
    this.variables.push({ value: 1, modifier: 'none', operation: '+' });
  }

  public removeVariable(index: number): void {
    this.variables.splice(index, 1);
  }

  public clearHistory(): void {
    this.history = [];
  }
}
