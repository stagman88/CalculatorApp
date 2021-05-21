import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Calculator App';

  operand1;
  operation = undefined;
  operand3;

  calculationStringMain = '';
  calculationStringSub = '';

  answered = false;

  clear() {
    this.calculationStringMain = '';
    this.calculationStringSub = '';
    this.operand1;
    this.operation;
    this.operand3;
  }

  delete() {
    this.calculationStringMain = this.calculationStringMain.toString().slice(0, -1);
  }

  enterValue(key: any) {
    if (key === '.' && this.calculationStringMain.includes('.')) return;
    this.calculationStringMain = this.calculationStringMain.toString() + key.toString();
  }

  condition(key: any) {
    if (this.calculationStringMain === '') return;
    if (this.calculationStringSub !== '') {
      this.compute();
    }
    this.operation = key.toString();
    this.calculationStringSub = this.calculationStringMain.toString() + key.toString();
    this.calculationStringMain = '';
  }

  compute() {
    let computation;
    const sub = parseFloat(this.calculationStringSub);
    const main = parseFloat(this.calculationStringMain);
    if (isNaN(sub) || isNaN(main)) return;
    switch (this.operation) {
      case '+':
        computation = sub + main;
        break
      case '-':
        computation = sub - main;
        break
      case '*':
        computation = sub * main;
        break
      case '÷':
        computation = sub / main;
        break
      default:
        return
    }
    this.calculationStringMain = computation;
    this.operation = undefined;
    this.calculationStringSub = '';
  }

  getDisplayNumber(key: any) {
    const stringNumber = key.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay: any;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return integerDisplay.decimalDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.calculationStringMain = this.getDisplayNumber(this.operand1);
    if (this.operation != null) {
      this.calculationStringSub = this.getDisplayNumber(this.operand3);
    } else {
      this.calculationStringSub = '';
    }
  }

}
