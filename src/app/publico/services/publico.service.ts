import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content, ImagenFile, VideosEvento } from 'src/app/admin-museo/interfaces/content.interface';
import { Video } from 'src/app/admin-museo/interfaces/video.interface';
// import { environment } from 'src/environments/environment';
import { environment } from 'src/environments/environment.prod';


import { Contador } from '../interfaces/contador.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  // **********Funcionalidades para Contenido*****************
  getPublicEvents(): Observable<Content[]> {
    
    return this.http.get<Content[]>( this.baseUrl + '/eventos-publicos' );
  }

  getPublicNoticias(): Observable<Content[]> {
    
    return this.http.get<Content[]>( this.baseUrl + '/noticias-publicos' );
  }

  getPublicMuestras(): Observable<Content[]> {
    
    return this.http.get<Content[]>( this.baseUrl + '/muestras-publicos' );
  }

  getPublicVisitas(): Observable<Content[]> {
    
    return this.http.get<Content[]>( this.baseUrl + '/visitas-publicos' );
  }

  getMuestraPrincipal(): Observable<Content> {

    return this.http.get<Content>( this.baseUrl + '/muestra-principal' );
  }

  getSingleContent( id: number ): Observable<Content> {
    
    return this.http.get<Content>( this.baseUrl + '/content-publico/' + id,  );
  }

  getImagenesMuestraPrincipal(): Observable<ImagenFile[]> {

    return this.http.get<ImagenFile[]>( this.baseUrl + '/muestra-principal-imagenes' );
  }

  eventosPrincipales(): Observable<Content[]> {
    return this.http.get<Content[]>(this.baseUrl + '/eventos-principales');
  }

  eventosPrincipalesTodos(): Observable<Content[]> {
    return this.http.get<Content[]>(this.baseUrl + '/eventos-principales-todos');
  }

  getImagenesEventoPrincipal(): Observable<ImagenFile[]> {

    return this.http.get<ImagenFile[]>( this.baseUrl + '/evento-principal-imagenes' );
  }

  noticiasPrincipales(): Observable<Content[]> {
    return this.http.get<Content[]>(this.baseUrl + '/noticias-principales');
  }

  noticiasPrincipalesTodas(): Observable<Content[]> {
    return this.http.get<Content[]>(this.baseUrl + '/noticias-principales-all');
  }

  getImagenesNoticiaPrincipal(): Observable<ImagenFile[]> {

    return this.http.get<ImagenFile[]>( this.baseUrl + '/noticia-principal-imagenes' );
  }

  visitasPrincipales(): Observable<Content[]> {
    return this.http.get<Content[]>(this.baseUrl + '/visitas-principales');
  }

  getImagenesVisitaPrincipal(): Observable<ImagenFile[]> {

    return this.http.get<ImagenFile[]>( this.baseUrl + '/visita-principal-imagenes' );
  }

  incrementarVisitas(id: number): Observable<any> {
    const url = `${this.baseUrl}/incrementar-visitas/${id}`;
    return this.http.put<any>(url, {});
  }

  eventosProgramados(): Observable<Content[]> {

    return this.http.get<Content[]>(this.baseUrl + '/eventos-programados' );
  }

  noticiasMasVisitadas(): Observable<Content[]> {

    return this.http.get<Content[]>( this.baseUrl + '/noticias-mas-visitadas' );
  }

  // *************Funcionalidades para videos***************
  getPublicVideos(): Observable<Video[]> {

    return this.http.get<Video[]>( this.baseUrl + '/videos-publicos' )
  }

  getPublicVideosEvento( id: number | undefined ): Observable<VideosEvento[]> {

    return this.http.get<VideosEvento[]>( this.baseUrl + '/videos-evento-porId/' + id )
  }

  // *************Funcionalidades para visitas***************
  postVisitasDiarias(): Observable<any> {
    
    const body = {};  

    return this.http.post<Contador>(this.baseUrl + '/visitas-diarias-guardar', body);
  }

  getVisitasDiarios(): Observable<Contador> {

    return this.http.get<Contador>(this.baseUrl + '/visitas-diarias');
  }

  getVisitasSemanales(): Observable<number> {

    return this.http.get<number>(this.baseUrl + '/visitas-semanales');
  }

  getVisitasMensuales(): Observable<number> {

    return this.http.get<number>(this.baseUrl + '/visitas-mensuales');
  }

  getVisitasAnuales(): Observable<number> {

    return this.http.get<number>(this.baseUrl + '/visitas-anuales');
  }


}
