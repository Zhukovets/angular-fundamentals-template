import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform{
    transform(value: number): string {
        if (!value || value <= 0) {
          return '0m'; 
        }
    
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
    
        const hoursDisplay = hours > 0 ? `${hours}h ` : '';
        const minutesDisplay = minutes > 0 ? `${minutes}m` : '';
    
        return `${hoursDisplay}${minutesDisplay}`.trim();
      }
}
