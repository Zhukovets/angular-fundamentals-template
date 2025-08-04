import { Pipe } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe {
  transform(duration: number): string {
    if (!duration || duration < 0) return "00:00 hours";
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursFormatted = String(hours).padStart(2, "0");
    const minutesFormatted = String(minutes).padStart(2, "0");

    return `${hoursFormatted}:${minutesFormatted} hours`;
  }
}
