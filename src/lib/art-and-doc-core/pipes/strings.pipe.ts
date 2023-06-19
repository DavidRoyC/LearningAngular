import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(value: string, maxlen: number): string {
    return !maxlen || maxlen < 2 || !value || value.length < maxlen
      ? value
      : value.substring(0, maxlen - 1) + '\u2026';
  }
}

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string | null {
    return value
      ?.toString()
      .toLowerCase()
      .split('.')
      .map((str) => str.trim())
      .map((str, index, array) => {
        const ending =
          array.length > 1 && index + 1 < array.length
            ? array[index + 1] === ''
              ? '.'
              : '. '
            : '';
        str.length === 0
          ? ending
          : str.charAt(0)?.toUpperCase() + str?.substring(1) + ending;
      })
      .join('')
      .trim();
  }
}

@Pipe({
  name: 'error_message',
})
export class ErrorMessagePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    let msg = '';

    for (const error in value) {
      switch (error) {
        case 'required':
          msg += 'Campo obligatorio.\n';
          break;
        case 'minlength':
          msg += `Debe tener al menos ${value[error].requiredLength} caracteres.\n`;
          break;
        case 'maxlength':
          msg += `Debe tener como máximo ${value[error].requiredLength} caracteres.\n`;
          break;
        case 'min':
          msg += `El valor debe ser mayor o igual que ${value[error].min}.\n`;
          break;
        case 'max':
          msg += `El valor debe ser menor o igual que ${value[error].max}.\n`;
          break;
        case 'email':
        case 'pattern':
          msg += 'El formato no es correcto.\n';
          break;

        default:
          if (typeof value[error] === 'string')
            msg += `${value[error]}${value[error].endsWith('.') ? '' : '.'}\n`;
          else if (typeof value[error]?.message === 'string')
            msg += `${value[error].message}${
              value[error].message.endsWith('.') ? '' : '.'
            }\n`;
          break;
      }
    }

    return msg;
  }
}
export const PIPES_STRINGS = [EllipsisPipe, CapitalizePipe, ErrorMessagePipe];
