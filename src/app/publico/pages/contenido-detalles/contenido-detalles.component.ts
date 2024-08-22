import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Content, VideosEvento } from 'src/app/admin-museo/interfaces/content.interface';
import { MuseoService } from 'src/app/admin-museo/services/museo.service';
import { PublicoService } from '../../services/publico.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-contenido-detalles',
  templateUrl: './contenido-detalles.component.html',
  styleUrls: ['./contenido-detalles.component.css']
})
export class ContenidoDetallesComponent {

  @ViewChild('mainVideo', { static: true }) mainVideo!: ElementRef;

  contenido: Content = {
    nombre: '',
    info: '',
    fecha: new Date,
    detalles: '',
    tipo: '',
    principal: false,
    programado: false,
    prioridad: false,
    visitas: 0,
  };
  
  id: number | undefined = 0; 
  videos: VideosEvento[] = [];
  selectedVideo: SafeResourceUrl | undefined;
  loading = true;

  isVisible1 = false;
  isVisible2 = false;
  
  private animationStarted1 = false;
  private animationStarted2 = false;

  imageHoverStatesVideo: { [key: string]: boolean } = {};

  constructor( private activeRoute: ActivatedRoute, private publicoService: PublicoService, private el: ElementRef, private sanitizer: DomSanitizer ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const div1 = this.el.nativeElement.querySelector('#div1');
    const div2 = this.el.nativeElement.querySelector('#div2');
  
    if (div1 && div2) {
      const rect1 = div1.getBoundingClientRect()!;
      const rect2 = div2.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      if (!this.animationStarted1) {
        const isTopVisible1 = rect1.top <= windowHeight && rect1.top >= 0;
        const isBottomVisible1 = rect1.bottom >= 0 && rect1.bottom <= windowHeight;
  
        this.isVisible1 = isTopVisible1 || isBottomVisible1;
  
        if (this.isVisible1) {
          this.animationStarted1 = true;
        }
      }
  
      if (!this.animationStarted2) {
        const isTopVisible2 = rect2.top <= windowHeight && rect2.top >= 0;
        const isBottomVisible2 = rect2.bottom >= 0 && rect2.bottom <= windowHeight;
  
        this.isVisible2 = isTopVisible2 || isBottomVisible2;
  
        if (this.isVisible2) {
          this.animationStarted2 = true;
        }
      }
    }
  }

  ngOnInit() {
    window.scrollTo(450, 550);
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.publicoService.getSingleContent( id ))
      )
      .subscribe((contenido) => {
        if (contenido.fecha) {
          contenido.fecha = new Date(contenido.fecha);
        }
        this.contenido = contenido;
        this.id = contenido.id;
        this.loading = false;
        this.mostrarVideos();
      });

  }

  mostrarVideos() {
    this.publicoService.getPublicVideosEvento(this.id).subscribe((videos) => {
      this.videos = videos;
      if (videos.length > 0) {
        // Si hay videos, establecer el primer video como seleccionado por defecto
        this.selectedVideo = this.getSafeUrl(videos[0].url);
      } 
    });
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Función que se ejecuta cuando se hace clic en un video de la lista
  playVideo(url: string) {
    this.selectedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}