import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-font-sizer',
  template: `
  <div>
    <button (click)="dec()">-</button>
    <span [style.font-size.px]="size">FontSize: {{size}}px</span>
    <button (click)="inc()">+</button>
  </div>`
})
export class SizerComponent {
  @Input()  size: number | string = 12;
  @Output() sizeChange = new EventEmitter<number>();

  dec() : void { this.resize(-1); }
  inc() : void { this.resize(+1); }

  resize(delta: number) : void {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
}
