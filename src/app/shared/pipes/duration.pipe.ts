import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform {
    // Add your code here
    transform(value: number): string {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
    }
}


