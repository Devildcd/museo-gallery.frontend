import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListEventosComponent } from './pages/list-eventos/list-eventos.component';
import { ListNoticiasComponent } from './pages/list-noticias/list-noticias.component';
import { ListVisitasPersComponent } from './pages/list-visitas-pers/list-visitas-pers.component';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { CreateVideosComponent } from './pages/create-videos/create-videos.component';
import { EditVideosComponent } from './pages/edit-videos/edit-videos.component';
import { ListMuestraMesComponent } from './pages/list-muestra-mes/list-muestra-mes.component';
import { HomeComponent } from './pages/home/home.component';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMuseoRoutingModule } from './admin-museo-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ImgPipe } from './pipes/img.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { VideosEventoComponent } from './pages/videos-evento/videos-evento.component';



@NgModule({
  declarations: [
    ListEventosComponent,
    ListNoticiasComponent,
    ListVisitasPersComponent,
    ListVideosComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    CreateVideosComponent,
    EditVideosComponent,
    ListMuestraMesComponent,
    HomeComponent,
    ImgPipe,
    DateFormatPipe,
    VideosEventoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminMuseoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class AdminMuseoModule { }
