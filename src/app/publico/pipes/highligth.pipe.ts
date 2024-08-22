import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highligth'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search || !text) {
      return text;
    }

    const pattern = new RegExp(search, 'gi');
    return text.replace(pattern, match => `<span class="highlight">${match}</span>`);
  }
}
