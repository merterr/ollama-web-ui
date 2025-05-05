import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nanoToSeconds'
})
export class NanoToSecondsPipe implements PipeTransform {
  transform(value: number, fractionDigits: number = 2): string {
    if (!value) return '0 sn';
    const seconds = value / 1_000_000_000;
    return seconds.toFixed(fractionDigits) + ' sn';
  }
}
