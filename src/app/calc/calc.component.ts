import { Component, Input, Output, OnChanges, OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { LoggerService } from 'src/lib/art-and-doc-core';
import { NotificationService, NotificationType } from '../common-services';
import { environment } from 'src/environments/environment';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit, OnChanges {
  public readonly Math = Math;

  private current = '0';
  private ongoing = '';
  private operation = '+';
  private accumulated = 0;
  private clean = true;



  constructor(private log: LoggerService, private notify: NotificationService) {
    this.initialize();
  }

  @Input() init: string | number = '0';
  @Output() updated: EventEmitter<number> = new EventEmitter();

  private decimalSeparator = '.';
  public get DecimalSeparator() { return this.decimalSeparator }
  @Input() set DecimalSeparator(value: string) {
    if (value !== this.decimalSeparator && (value === '.' || value === ',')) {
      this.decimalSeparator = value;
    } else {
      this.log.error('Separador decimal no reconocido.');
    }
  }

  get Current():string { return this.current; }
  get Ongoing():string { return this.ongoing; }

  public initialize(): void {
    this.current = '0';
    this.ongoing = '';
    this.operation = '+';
    this.accumulated = 0;
    this.clean = true;
  }

  public setDigit(value: number | string): void {
    if (typeof (value) !== 'string') value = value.toString();
    if (value.length != 1 ||value < '0' || value > '9') {
      this.log.error('No es un valor numérico.');
      return;
    }

    if (this.clean || this.current === '0') {
      this.current = value;
      this.clean = false;
    } else {
      this.current += value;
    }
  }

  public setOperator(value: number | string):void {
    if (typeof value === "number" || (!Number.isNaN(parseFloat(value)) && parseFloat(value).toString() == value)) {
      this.current = value.toString();
      this.clean = false;
    } else {
      this.log.error('No es un valor numérico.');
    }
  }

  public setDecimalPoint():void {
    if (this.clean) {
      this.current = '0.';
      this.clean = false;
    } else if (this.current.indexOf('.') === -1) {
      this.current += '.';
    } else {
      this.notify.add('Ya hay decimales.', NotificationType.warn);
      this.log.warn('Ya hay decimales.');
    }
  }

  public delete():void {
    if (this.clean || this.current.length == 1 || (this.current.length == 2 && this.current.startsWith('-'))) {
      this.current = '0';
      this.clean = false;
    } else{
      this.current = this.current.substring(0, this.current.length - 1);
    }
  }

  public changeSign():void {
    this.current = (-this.current).toString();
    if (this.clean) {
      this.accumulated = -this.accumulated;
    }
  }

  public calculate(value: string):void {
    if ('+-*/='.indexOf(value) == -1) {
      this.log.error(`Operación no soportada: ${value}`);
      return;
    }

    const operator = parseFloat(this.current);
    switch (this.operation) {
      case '+':
        this.accumulated += operator;
        break;
      case '-':
        this.accumulated -= operator;
        break;
      case '*':
        this.accumulated *= operator;
        break;
      case '/':
        this.accumulated /= operator;
        break;
    }
    // Con eval()
    // accumulated = eval (accumulated + operador + miPantalla);
    this.ongoing = value == '=' ? '' : (`${this.accumulated} ${value}`);
    // Number: double-precision IEEE 754 floating point.
    // 9.9 + 1.3, 0.1 + 0.2, 1.0 - 0.9
    this.ongoing = parseFloat(this.accumulated.toPrecision(15)).toString();
    // this.miPantalla = this.accumulated.toString();
    this.updated.emit(this.accumulated);
    this.operation = value;
    this.clean = true;
  }




  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    /*
    if (this.init) {
      this.setOperator(this.init);
    }
    */
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.init) {
      this.setOperator(this.init.toString());
    }
  }

  /* * /
  keyboard = fromEvent(document, 'keydown').subscribe({next: ev => this.handleKeyDown(ev as KeyboardEvent)})
  ngOnDestroy() {
     this.keyboard.unsubscribe()
  }
  /* */

  handleKeyDown(ev: KeyboardEvent) {
    if ('0' <= ev.key && ev.key <= '9') {
      this.setDigit(ev.key)
    } else if ('+-*/='.indexOf(ev.key) >= 0) {
      this.calculate(ev.key)
    } else
      switch (ev.key.toLowerCase()) {
        case '.': if (this.DecimalSeparator === '.') this.setDecimalPoint();  break;
        case ',': if (this.DecimalSeparator === '.') this.setDecimalPoint();  break;
        case 'backspace': this.delete(); break;
        case 'c': this.initialize(); break;
      }
    if (!environment.production) console.log(`Tecla: ${ev.key}`)
  }
}
