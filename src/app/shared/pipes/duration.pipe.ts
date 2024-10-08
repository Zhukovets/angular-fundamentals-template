import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  // Add your code here
  transform(value: number): string {
    if (!value && value !== 0) {
      return "";
    }
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${
      hours === 1 ? "hour" : "hours"
    }`;
  }
}
