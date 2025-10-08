import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    if (value === null || value === undefined) return '';
    const raw = String(value).trim();
    if (!raw) return '';

    if (value instanceof Date && !isNaN(value.getTime())) {
      return this.formatDateParts(value.getDate(), value.getMonth() + 1, value.getFullYear());
    }

    const parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) {
      return this.formatDateParts(parsed.getDate(), parsed.getMonth() + 1, parsed.getFullYear());
    }

    const parts = raw.split(/[^0-9]+/).filter(Boolean).map(p => Number(p));
    if (parts.length >= 3) {
      let dd: number, mm: number, yyyy: number;

      if (parts[0] > 31) {
        yyyy = parts[0];
        mm = parts[1];
        dd = parts[2];
      } else if (parts[2] > 31) {
        yyyy = parts[2];
        const first = parts[0];
        const second = parts[1];
        if (first > 12) {
          dd = first;
          mm = second;
        } else {
          mm = first;
          dd = second;
        }
      } else {
        dd = parts[0];
        mm = parts[1];
        yyyy = parts[2];
      }

      if (dd && mm && yyyy) {
        return this.formatDateParts(dd, mm, yyyy);
      }
    }

    return raw;
  }

  private formatDateParts(d: number, m: number, y: number): string {
    const dd = String(d).padStart(2, '0');
    const mm = String(m).padStart(2, '0');
    const yyyy = String(y);
    return `${dd}.${mm}.${yyyy}`;
  }
}
