import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform{

    transform(value: number): string {
        if(isNaN(value) || value < 0) {
            return '00:00';
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60

        return `${this.pad(hours)}:${this.pad(minutes)}`

    }

    private pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
      }
    // Add your code here
}
