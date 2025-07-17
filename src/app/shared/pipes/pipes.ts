import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string | number | undefined): string {
    if (!value) return "Creation Date";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "Creation Date";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}

@Pipe({
  name: "authorNames",
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[] | undefined): string {
    if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
      return "Authors";
    }

    return authorIds
      .map((authorId) => {
        if (!authorId || typeof authorId !== "string") {
          return "Unknown Author";
        }
        return authorId;
      })
      .join(", ");
  }
}
