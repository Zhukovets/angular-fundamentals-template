import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  // Add your code here
  transform(value: number): string {
    const hour = Math.floor(value / 60);
    const minutes = value % 60;

    const hourFormat = hour < 10 ? '0' + hour : hour.toString();
    const minutesFormat = minutes < 10 ? '0' + minutes : minutes.toString();

    const isHourPlural = hour === 1 ? 'hour' : 'hours';
    return `${hourFormat}:${minutesFormat} ${isHourPlural}`;
  }
}
