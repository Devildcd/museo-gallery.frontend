import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HistoriaComponent } from './pages/historia/historia.component';
import { MuseoComponent } from './pages/museo/museo.component';
import { ProgramacionCulturalComponent } from './pages/programacion-cultural/programacion-cultural.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContenidoDetallesComponent } from './pages/contenido-detalles/contenido-detalles.component';
import { Sala1Component } from './pages/sala1/sala1.component';
import { Sala2Component } from './pages/sala2/sala2.component';
import { Sala3Component } from './pages/sala3/sala3.component';
import { Sala4Component } from './pages/sala4/sala4.component';
import { Sala5Component } from './pages/sala5/sala5.component';
import { Sala6Component } from './pages/sala6/sala6.component';
import { Sala7Component } from './pages/sala7/sala7.component';
import { Sala8Component } from './pages/sala8/sala8.component';
import { CentroDocumentacionComponent } from './pages/centro-documentacion/centro-documentacion.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'inicio', component: InicioComponent,
        data: { animation: 'fadeInOut' },
      },
      {
        path: 'historia', component: HistoriaComponent
      },
      {
        path: 'museo', component: MuseoComponent
      },
      {
        path: 'eventos', component: ProgramacionCulturalComponent
      },
      {
        path: 'noticias', component: NoticiasComponent
      },
      {
        path: 'detalles/:id', component: ContenidoDetallesComponent
      },
      {
        path: 'sala1', component: Sala1Component
      },
      {
        path: 'sala2', component: Sala2Component
      },
      {
        path: 'sala3', component: Sala3Component
      },
      {
        path: 'sala4', component: Sala4Component
      },
      {
        path: 'sala5', component: Sala5Component
      },
      {
        path: 'sala6', component: Sala6Component
      },
      {
        path: 'sala7', component: Sala7Component
      },
      {
        path: 'sala8', component: Sala8Component
      },
      {
        path: 'centro-documentación', component: CentroDocumentacionComponent
      },
      {
        path: '**', redirectTo: 'inicio'
      }
    ]
  }
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
export class PublicoRoutingModule { }
