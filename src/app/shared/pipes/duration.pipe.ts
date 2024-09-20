import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return (
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ` + (hours >= 2 ? "hours" : "hour")
    );
  }
}
