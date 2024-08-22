import { Component } from '@angular/core';
import { SharedService } from 'src/app/publico/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  isSidebarVisible = true;
  showSidebar: boolean = false;

  constructor( private sharedService: SharedService ) {}

  ngOnInit(): void {
    this.sharedService.showSidebar$.subscribe((show: boolean) => {
      this.showSidebar = show;
      console.log('Valor actual de showSidebar en SidebarComponent:', this.showSidebar);
    });
  }
}
