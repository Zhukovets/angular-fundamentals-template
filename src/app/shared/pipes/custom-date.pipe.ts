import { Pipe } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe {
  // Add your code here
  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return "";
    }

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // месяцы с 0
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
