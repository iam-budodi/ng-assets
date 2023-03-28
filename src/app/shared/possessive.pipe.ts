import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'possessive',
})
export class PossessivePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    if (value.endsWith('s')) return `${value}'`;
    else return `${value}'s`;
  }
}
