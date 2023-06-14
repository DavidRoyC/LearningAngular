import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDecimalPoint'
})
export class ToDecimalPointPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof (value) === 'number') {
      value = value.toString();
    }
    if (typeof (value) === 'string') {
      return value.replace(/\./g, ',');
    }
    return value;
  }
}

export const PIPES_NUMERICS = [ ToDecimalPointPipe, ]
