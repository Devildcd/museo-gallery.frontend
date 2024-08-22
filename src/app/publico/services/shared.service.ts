import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  // variables para el menu en el modulo publico
  public showSidebarSubject = new BehaviorSubject<boolean>(false);
  showSidebar$ = this.showSidebarSubject.asObservable();

  showSidebar: boolean = false;

  setShowSidebar(value: boolean) {
    this.showSidebarSubject.next(value);
  }

  // ----------------------
  toggleSidebar(): void {
    const body = document.body;
    body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', body.classList.contains('sb-sidenav-toggled').toString());
  }


  search(query: string): HTMLElement[] {
    const elements: HTMLElement[] = [];
    const allElements = document.querySelectorAll<HTMLElement>('*');
  
    allElements.forEach((element: HTMLElement) => {
      if (element.innerText.includes(query)) {
        elements.push(element);
        this.scrollToElement(element);
      }
    });
  
    return elements;
  }

  private scrollToElement(element: HTMLElement): void {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

}
