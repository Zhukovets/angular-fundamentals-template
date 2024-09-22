import { Pipe } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe {
    transform(value: number): string {
        if(value < 0){
            return '00:00';
        }
    
        const formattedHours = Math.floor(value / 60).toString().padStart(2, '0');
        const formattedMinutes = (value % 60).toString().padStart(2, '0');
    
        return `${formattedHours}:${formattedMinutes}`;
    }
}
