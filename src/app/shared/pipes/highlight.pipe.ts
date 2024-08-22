import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search: string): string {
    if (!search || !text) {
      return text;
    }

    const searchLower = search.toLowerCase();
    const textLower = text.toLowerCase();

    const pattern = new RegExp(`(${searchLower})`, 'gi');
    return text.replace(pattern, '<span class="highlight">$1</span>');
  }

}
