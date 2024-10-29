import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    // Pad hours and minutes to ensure they are 2 digits
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');

    // Decide between "hour" and "hours" based on the value
    const hourLabel = hours === 1 ? 'hour' : 'hours';

    return `${hoursStr}:${minutesStr} ${hourLabel}`;
  }
}

