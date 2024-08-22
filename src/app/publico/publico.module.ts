import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './pages/inicio/inicio.component';
import { PublicoRoutingModule } from './publico-routing.module';
import { HistoriaComponent } from './pages/historia/historia.component';
import { MuseoComponent } from './pages/museo/museo.component';
import { ProgramacionCulturalComponent } from './pages/programacion-cultural/programacion-cultural.component';
import { BibliotecaVirtualComponent } from './pages/biblioteca-virtual/biblioteca-virtual.component';
import { CentroDocumentacionComponent } from './pages/centro-documentacion/centro-documentacion.component';
import { InformacionesComponent } from './pages/informaciones/informaciones.component';
import { SalasComponent } from './components/salas/salas.component';
import { Sala1Component } from './pages/sala1/sala1.component';
import { Sala2Component } from './pages/sala2/sala2.component';
import { Sala3Component } from './pages/sala3/sala3.component';
import { Sala4Component } from './pages/sala4/sala4.component';
import { Sala5Component } from './pages/sala5/sala5.component';
import { Sala6Component } from './pages/sala6/sala6.component';
import { Sala7Component } from './pages/sala7/sala7.component';
import { Sala8Component } from './pages/sala8/sala8.component';
import { MainComponent } from './pages/main/main.component';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ImgPipe } from './pipes/img.pipe';
import { MaterialModule } from '../material/material.module';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { ContenidoDetallesComponent } from './pages/contenido-detalles/contenido-detalles.component';
import { ContenidoSala9Component } from './components/contenido-sala9/contenido-sala9.component';
import { ContenidoSala10Component } from './components/contenido-sala10/contenido-sala10.component';
import { FormsModule } from '@angular/forms';
import { HighlightPipe } from './pipes/highligth.pipe';
import { ModalVistasComponent } from './components/modal-vistas/modal-vistas.component';
import { ImagenesSalaComponent } from './components/imagenes-sala/imagenes-sala.component';
import { BotonesFlotantesComponent } from './components/botones-flotantes/botones-flotantes.component';



@NgModule({
  declarations: [
    InicioComponent,
    HistoriaComponent,
    MuseoComponent,
    ProgramacionCulturalComponent,
    BibliotecaVirtualComponent,
    CentroDocumentacionComponent,
    InformacionesComponent,
    SalasComponent,
    Sala1Component,
    Sala2Component,
    Sala3Component,
    Sala4Component,
    Sala5Component,
    Sala6Component,
    Sala7Component,
    Sala8Component,
    MainComponent,
    ImgPipe,
    NoticiasComponent,
    ContenidoDetallesComponent,
    ContenidoSala9Component,
    ContenidoSala10Component,
    HighlightPipe,
    ModalVistasComponent,
    ImagenesSalaComponent,
    BotonesFlotantesComponent,
   
  ],
  imports: [
    CommonModule,
    PublicoRoutingModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    FormsModule,
  ],
  exports: [
    ImgPipe
  ]
})
export class PublicoModule { }
