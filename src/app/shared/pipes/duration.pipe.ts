import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'duration'
})

export class DurationPipe implements PipeTransform {
    transform(number: number): string {
        const hours = Math.floor(number / 60);
        const minutes = number % 60;
        const pad = (n: number) => n.toString().padStart(2, '0');
        const hourLabel = hours === 1 ? 'hour' : 'hours';
        return `${pad(hours)}:${pad(minutes)} ${hourLabel}`;
    }
}



