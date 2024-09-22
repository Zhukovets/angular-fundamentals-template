import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform{
    private datePipe: DatePipe = new DatePipe('en-US');

    transform(value: Date | string | number, format: string = 'MMM dd, yyyy'): string | null {
      if (!value) {
        return null;
      }
      return this.datePipe.transform(value, format);
    }
}
