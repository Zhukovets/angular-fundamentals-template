import { Pipe } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe {
    transform(value: string): string {
        if(!value){
            return value;
        }
    
        const parts = value.split('/');
        if(parts.length !== 3){
            return value;
        }

        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);    

        const formattedDay = String(new Date(year, month, day).getDate()).padStart(2, '0');
        const formattedMonth = String(new Date(year, month, day).getMonth() + 1).padStart(2, '0');
        const formattedYear = new Date(year, month, day).getFullYear();
    
        return `${formattedDay}.${formattedMonth}.${formattedYear}`;
    }
}
