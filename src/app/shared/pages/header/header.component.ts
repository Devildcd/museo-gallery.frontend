import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { MatMenuTrigger } from '@angular/material/menu';
import { SharedService } from 'src/app/publico/services/shared.service';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  isSticky: boolean = false;
  isShrunk: boolean = false;
  mostrarSubMenu: boolean = false;
  showMenu: boolean = false;

  query!: string;
  currentIndex: number = 0;
  lastScrollPosition: number = 0;
  isDropdownOpen: boolean = false;
  showIcon: boolean = false;
  
  constructor(
    public sharedService: SharedService,
    public dialog: MatDialog) {}

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= 20;
    this.isShrunk = window.pageYOffset >= 20;
    if (this.showMenu) {
      this.showMenu = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidth();
  }

  ngOnInit() {
    this.checkWidth();
  }

  checkWidth() {
    const width = window.innerWidth;
    this.showIcon = width <= 891;
  }

  // search(): void {
  //   const elements = this.sharedService.search(this.query);
  //   if (elements.length > 0) {
  //     if (this.currentIndex >= elements.length) {
  //       this.currentIndex = 0;
  //     }

  //     const element = elements[this.currentIndex];
  //     this.lastScrollPosition = element.getBoundingClientRect().top + window.pageYOffset;

  //     element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //     this.currentIndex++;
  //   } else {
  //     alert('No se encontraron coincidencias.');
  //   }
  // }
 
  mostrarMenu() {
    this.showMenu = !this.showMenu;
  }
  
  toggleSubMenu(event: Event): void {
    event.preventDefault(); // Evita la acción predeterminada del enlace
    this.mostrarSubMenu = !this.mostrarSubMenu;
  }
}
  
  

  
  
  
   
  
  


