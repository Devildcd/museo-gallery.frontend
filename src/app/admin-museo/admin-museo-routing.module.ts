import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListEventosComponent } from './pages/list-eventos/list-eventos.component';
import { ListNoticiasComponent } from './pages/list-noticias/list-noticias.component';
import { ListVisitasPersComponent } from './pages/list-visitas-pers/list-visitas-pers.component';
import { ListMuestraMesComponent } from './pages/list-muestra-mes/list-muestra-mes.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';
import { ListVideosComponent } from './pages/list-videos/list-videos.component';
import { CreateVideosComponent } from './pages/create-videos/create-videos.component';
import { EditVideosComponent } from './pages/edit-videos/edit-videos.component';
import { VideosEventoComponent } from './pages/videos-evento/videos-evento.component';

const routes: Routes = [
    {
      path: '', 
      component: HomeComponent,
      children: [
        {
          path: 'eventos', component: ListEventosComponent
        },
        {
          path: 'noticias', component: ListNoticiasComponent
        },
        {
          path: 'visitas-personalidades', component: ListVisitasPersComponent
        },
        {
          path: 'muestras-mensuales', component: ListMuestraMesComponent
        },
        {
          path: 'crear-contenido', component: CreateComponent
        },
        {
          path: 'editar-contenido/:id', component: EditComponent
        },
        {
          path: 'detalles/:id', component: ShowComponent
        },
        {
          path: 'videos', component: ListVideosComponent
        },
        {
          path: 'crear-video', component: CreateVideosComponent 
        },
        {
          path: 'editar-video/:id', component: EditVideosComponent
        },
        {
          path: 'videos-evento/:id', component: VideosEventoComponent
        },
        {
          path: '**', redirectTo: 'eventos'
        }
      ]
    },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AdminMuseoRoutingModule { }
