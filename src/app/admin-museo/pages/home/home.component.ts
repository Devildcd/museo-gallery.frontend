import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/publico/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

constructor( private sharedService: SharedService, public authService: AuthService, private router: Router, ) {}

onSidebarToggleClick(): void {
  this.sharedService.toggleSidebar();
}

closeSesion() {
  this.authService.logout().subscribe(() => {
    this.router.navigateByUrl('/museo/inicio');
  });
}

}
