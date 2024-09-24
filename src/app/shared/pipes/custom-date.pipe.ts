import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class CustomDatePipe implements PipeTransform {
  // Add your code here
}
