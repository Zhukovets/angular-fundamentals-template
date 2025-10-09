import { Pipe } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe {
  // Add your code here
  transform(value: number): string {
    if (typeof value !== "number" || isNaN(value) || value < 0)
      return "00:00 hour";
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const hourLabel = hours === 1 && minutes === 0 ? "hour" : "hours";
    return `${hh}:${mm} ${hourLabel}`;
  }
}
