import { Pipe } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe {
  // Add your code here
  transform(value: number | null | undefined): string {
    if (!value || isNaN(value)) {
      return "00:00 hour";
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");

    const suffix = value >= 120 ? "hours" : "hour";

    return `${hoursStr}:${minutesStr} ${suffix}`;
  }
}
