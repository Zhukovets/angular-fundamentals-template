import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    const n = Number(value);
    const total = Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;

    const hours = Math.floor(total / 60);
    const minutes = total % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');

    const suffix = hours > 1 ? 'hours' : 'hour';

    return `${hh}:${mm} ${suffix}`;
  }
}
