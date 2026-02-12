import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '00:00 hour';
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
    const label = hours === 1 && minutes === 0 ? 'hour' : 'hours';
    return `${hh}:${mm} ${label}`;
  }
}
