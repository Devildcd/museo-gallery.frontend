import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    const month = value.getMonth() + 1;
    const day = value.getDate();
    const year = value.getFullYear();
    return `${month}/${day}/${year}`;
  }

}
