import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis'})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxlen: number): string {
    return (!maxlen || maxlen < 2 || !value || value.length < maxlen) ? value : (value.substr(0, maxlen-1) + '\u2026');
  }
}

@Pipe({ name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string | null {
    return value?.toString()
      .toLowerCase()
      .split('.')
      .map(str => str.trim())
      .map((str, index, array) => {
        const ending = (array.length > 1 && index + 1 < array.length ? (array[index + 1] === '' ? '.' : '. ') : '');
        str.length === 0
          ? ending
          : str.charAt(0)?.toUpperCase() + str?.substring(1) + ending;
      })
      .join('')
      .trim();
  }
}
export const PIPES_STRINGS = [
  EllipsisPipe,
  CapitalizePipe,

];
