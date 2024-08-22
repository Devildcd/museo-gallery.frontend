import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Video } from 'src/app/admin-museo/interfaces/video.interface';
import { PublicoService } from '../../services/publico.service';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent {

  @ViewChild('mainVideo', { static: true }) mainVideo!: ElementRef;

  videos: Video[] = [];
  loading = false;
  isVisible1 = false;
  isVisible2 = false;
  private animationStarted1 = false;
  private animationStarted2 = false;
  imageHoverStatesVideo: { [key: string]: boolean } = {};

  constructor( private publicoService: PublicoService, private el: ElementRef ) {}

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
    window.scrollTo(0, 0);
    this.mostrarVideos();
  }

  mostrarVideos() {
    this.publicoService.getPublicVideos().subscribe((videos) => {
      this.videos = videos
      // console.log(this.videos);
      this.loading = false;
    });
  }

  // Función que se ejecuta cuando se hace clic en un video de la lista
  playVideo(videoUrl: any) {
    // Cambiar la URL del video de YouTube en el reproductor principal
    this.mainVideo.nativeElement.src = videoUrl;
  }

  

}
