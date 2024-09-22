import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

    transform(value: Date | string): string {
        if(!value) return '';

        const date = new Date(value);
        if(isNaN(date.getTime())) return '';

        const day = this.pad(date.getDate());
        const month = this.pad(date.getMonth() + 1);
        const year = date.getFullYear();
    
        return `${day}.${month}.${year}`;
    }

    private pad(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }
    // Add your code here
}
