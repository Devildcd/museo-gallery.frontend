import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';




import { Content, ImagenFile, VideosEvento } from '../interfaces/content.interface';
import { Video } from '../interfaces/video.interface';

@Injectable({
  providedIn: 'root'
})
export class MuseoService {

  // private baseUrl: string = environment.baseUrl;
  private baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient ) {}

  // ***********Funcionalidades para Contenido*************
  getEvents(): Observable<Content[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Content[]>(this.baseUrl + '/eventos', { headers });
  }

  getNews(): Observable<Content[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Content[]>(this.baseUrl + '/noticias', { headers });
  }

  getVisits(): Observable<Content[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Content[]>(this.baseUrl + '/visitas', { headers });
  }

  getSamples(): Observable<Content[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Content[]>(this.baseUrl + '/muestras', { headers });
  }

  storeContent( formData: FormData ): Observable<Content> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Content>(this.baseUrl + '/content', formData, { headers });
  }

  getSingleContent( id: number ): Observable<Content> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Content>( this.baseUrl + '/content/' + id, { headers } );
  }

  editContent( id: number | undefined, contenido: Content ): Observable<Content> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put<Content>(this.baseUrl + '/content/' + id, contenido, { headers } );
  }

  destroyContent(id: number | undefined): Observable<Content> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<Content>( this.baseUrl + '/content/' + id, { headers } );
  }

  destroyImage( imagenId: number ): Observable<ImagenFile> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<ImagenFile>(this.baseUrl + '/imagen/' + imagenId, { headers });
  }

  uploadImageOnly( data: FormData ): Observable<FormData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.post<FormData>(this.baseUrl + '/only-imagen', data, { headers });
  }

  // ********** Funcionalidades para Videos ***********
  getVideos(): Observable<Video[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Video[]>( this.baseUrl + '/videos', { headers } );
  }

  getSingleVideo( id: number ): Observable<Video> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Video>( this.baseUrl + '/video/' + id, { headers } );
  }

  storeVideo( video: Video ): Observable<Video> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<Video>( this.baseUrl + '/video', video, { headers } );
  } 

  editVideo( id: number | undefined, video: Video ): Observable<Video> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put<Video>( this.baseUrl + '/video/' + id, video, { headers } );
  }

  destroyVideo( id: number | undefined ): Observable<Video> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<Video>( this.baseUrl + '/video/' + id, { headers } );
  }

  countEventosNoticiasPrincipales(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + '/cantContenidosPrincipales');
  }

  countVisitasPrincipales(): Observable<number> {
    return this.http.get<number>(this.baseUrl + '/cantVisitasPrincipales');
  }


  // ********Funcionalidades para Videos de Eventos**********
  
  getVideosEvento(): Observable<VideosEvento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<VideosEvento[]>( this.baseUrl + '/videos-evento', { headers } );
  }

  getSingleVideoEvento( id: number ): Observable<VideosEvento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<VideosEvento>( this.baseUrl + '/video-evento/' + id, { headers } );
  }

  storeVideoEvento( video: VideosEvento ): Observable<VideosEvento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<VideosEvento>( this.baseUrl + '/video-evento', video, { headers } );
  } 

  editVideoEvento( id: number | undefined, video: VideosEvento ): Observable<VideosEvento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.put<VideosEvento>( this.baseUrl + '/video-evento/' + id, video, { headers } );
  }

  destroyVideoEvento( id: number | undefined ): Observable<VideosEvento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  
    return this.http.delete<VideosEvento>( this.baseUrl + '/video-evento/' + id, { headers } );
  }

  getVideosPorEventoId(id:number | undefined): Observable<VideosEvento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get<VideosEvento[]>( this.baseUrl + '/videos-evento-porId/' + id, { headers } );
  }


}
