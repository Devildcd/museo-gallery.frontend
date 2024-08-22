import { Component, ElementRef, HostListener } from '@angular/core';
import { Content, ImagenFile } from 'src/app/admin-museo/interfaces/content.interface';
import { PublicoService } from '../../services/publico.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  eventos: Content[] = [];
  noticias: Content[] = [];
  visitas: Content[] = [];
  imagenesMuestra: ImagenFile[] = [];
  imagenesEvento: ImagenFile[] = [];
  imagenesNoticia: ImagenFile[] = [];
  imagenesVisita: ImagenFile[] = [];
  muestraPrincipal!: Content;
  loading = true;
  contadoVisitas = false;
  // variables para animaciones
  isImageHoveredEvento = false;
  imageHoverStatesEvento: { [key: string]: boolean } = {};

  isImageHoveredNoticia = false;
  imageHoverStatesNoticia: { [key: string]: boolean } = {};
  
  isImageHoveredBottom = false;
  imageHoverStatesBottom: { [key: string]: boolean } = {};

  imageHoverBanner = false;
  showText = false;

  isVisible1 = false;
  isVisible2 = false;
  isVisible3 = false;
  isVisible4 = false;
  private animationStarted1 = false;
  private animationStarted2 = false;
  private animationStarted3 = false;
  private animationStarted4= false;

  constructor(  private publicoService: PublicoService, private el: ElementRef ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const rect1 = this.el.nativeElement.querySelector('#div1').getBoundingClientRect()!;
    const rect2 = this.el.nativeElement.querySelector('#div2').getBoundingClientRect();
    const rect3 = this.el.nativeElement.querySelector('#div3').getBoundingClientRect();
    const rect4 = this.el.nativeElement.querySelector('#div4').getBoundingClientRect();
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

    if (!this.animationStarted3) {
      const isTopVisible3 = rect3.top <= windowHeight && rect3.top >= 0;
      const isBottomVisible3 = rect3.bottom >= 0 && rect3.bottom <= windowHeight;

      this.isVisible3 = isTopVisible3 || isBottomVisible3;

      if (this.isVisible3) {
        this.animationStarted3 = true;
      }
    }

    if (!this.animationStarted4) {
      const isTopVisible4 = rect4.top <= windowHeight && rect4.top >= 0;
      const isBottomVisible4 = rect4.bottom >= 0 && rect4.bottom <= windowHeight;

      this.isVisible4 = isTopVisible4 || isBottomVisible4;

      if (this.isVisible4) {
        this.animationStarted4 = true;
      }
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.mostrarEventosPrincipales();
    this.mostrarNoticiasPrincipales();
    this.mostrarImagenesMuestra();
    this.mostrarMuestraPrincipal();
    this.mostrarImagenesEvento();
    this.mostrarImagenesNoticia();
    this.mostrarImagenesVisita();
  }

  mostrarEventosPrincipales() {
    this.publicoService
      .eventosPrincipales()
      .subscribe(( eventos ) => {
        this.eventos = eventos.map(( evento ) => {
          if (evento.fecha) {
            evento.fecha = new Date(evento.fecha); // Convertir la cadena de texto a un objeto Date
          }
          return evento;
        });
        this.eventos = eventos;
      });
  }

  mostrarNoticiasPrincipales() {
    this.publicoService
      .noticiasPrincipales()
      .subscribe(( noticias ) => {
        this.noticias = noticias.map(( noticia ) => {
          if (noticia.fecha) {
            noticia.fecha = new Date(noticia.fecha); // Convertir la cadena de texto a un objeto Date
          }
          return noticia;
        });
        this.noticias = noticias;
      });
  }

  mostrarImagenesMuestra() {
    this.publicoService
      .getImagenesMuestraPrincipal()
      .subscribe(( imagenes ) => {
        this.imagenesMuestra = imagenes;
      });
  }

  mostrarMuestraPrincipal() {
    this.publicoService
      .getMuestraPrincipal()
      .subscribe(( muestraPrincipal ) => {
        this.muestraPrincipal = muestraPrincipal
       
      });
  }

  mostrarImagenesEvento() {
    this.publicoService
      .getImagenesEventoPrincipal()
      .subscribe(( eventos ) => {
        this.imagenesEvento = eventos;
      
        this.loading = false;
      });
  }

  mostrarImagenesNoticia() {
    this.publicoService
      .getImagenesNoticiaPrincipal()
      .subscribe(( noticias ) => {
        this.imagenesNoticia = noticias;
       
      });
  }

  mostrarImagenesVisita() {
    this.publicoService
      .getImagenesVisitaPrincipal()
      .subscribe(( visitas ) => {
        this.imagenesVisita = visitas;
       
      });
  }

  incrementarVisitas( id: number ) {
    this.publicoService.incrementarVisitas(id).subscribe(response => {
    });
  }

}
