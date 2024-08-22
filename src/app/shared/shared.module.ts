import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from './pipes/highlight.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HighlightPipe,
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
  ] 
})
export class SharedModule { }
