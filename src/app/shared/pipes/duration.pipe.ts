import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {

    if (duration < 0) {
      return ''
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const hourText = hours < 2 ? 'hour' : 'hours';

    return `${formattedHours}:${formattedMinutes} ${hourText}`;
  }
}
