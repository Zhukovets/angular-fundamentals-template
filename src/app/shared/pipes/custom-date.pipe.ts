import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})

export class CustomDatePipe  implements PipeTransform {
    // Add your code here
    transform(value: Date): string {
        const day = String(value.getDate()).padStart(2, '0');
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const year = value.getFullYear();
        return `${day}.${month}.${year}`;
    }

}