import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  private searchTermSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setSearchTerm(searchTerm: string) {
    this.searchTermSubject.next(searchTerm);
  }

  getSearchTerm() {
    return this.searchTermSubject.asObservable();
  }
}
