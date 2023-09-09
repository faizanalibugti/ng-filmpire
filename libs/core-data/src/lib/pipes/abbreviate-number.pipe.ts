import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abbreviateNumber',
})
export class AbbreviateNumberPipe implements PipeTransform {
  transform(number: number): string | null {
    if (isNaN(number) || number === null || number === 0) {
      return null;
    }

    const powers = [
      { key: 'Q', value: 1e15 },
      { key: 'T', value: 1e12 },
      { key: 'B', value: 1e9 },
      { key: 'M', value: 1e6 },
      { key: 'k', value: 1e3 },
    ];

    let abs = Math.abs(number);
    let key = '';

    for (const power of powers) {
      if (abs >= power.value) {
        abs = abs / power.value;
        key = power.key;
        break;
      }
    }

    return (number < 0 ? '-' : '') + abs.toFixed(1) + key;
  }
}
