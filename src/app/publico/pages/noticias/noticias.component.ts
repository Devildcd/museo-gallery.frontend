import { Component, ElementRef, HostListener } from '@angular/core';
import { Content, ImagenFile } from 'src/app/admin-museo/interfaces/content.interface';
import { PublicoService } from '../../services/publico.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {

  noticias: Content[] = [];
  noticiasPrincipalesAll: Content[] = [];
  noticiasMasVisitadas: Content[] = [];
  terminoBusqueda: string = '';
  coincidencias: Content[]= [];
  imagenesNoticias: ImagenFile[] = [];
  p: number = 1;
  campoBuscar: boolean = false;
  loading = true;
  // variables para efectos de animacion
  isImageHovered = false;
  imageHoverStates: { [key: string]: boolean } = {};
  isHovered: boolean = false;
  isHoveredStatesPrincipal :{ [key: string]: boolean } = {}

  isVisible1 = false;
  isVisible2 = false;
  private animationStarted1 = false;
  private animationStarted2 = false;
  currentTimestamp: number = Date.now();

  constructor(private publicoService: PublicoService, private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const rect1 = this.el.nativeElement.querySelector('#div1').getBoundingClientRect();
    const rect2 = this.el.nativeElement.querySelector('#div2').getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (!this.animationStarted1) {
      const isTopVisible1 = rect1.top <= windowHeight && rect1.top >= 0;
      const isBottomVisible1 = rect1.bottom >= 0 && rect1.bottom <= windowHeight;

      this.isVisible1 = isTopVisible1 || isBottomVisible1;

      if (this.isVisible1) {
        this.animationStarted1 = true;
        // Agrega aquí la lógica para iniciar la animación del div1
      }
    }

    if (!this.animationStarted2) {
      const isTopVisible2 = rect2.top <= windowHeight && rect2.top >= 0;
      const isBottomVisible2 = rect2.bottom >= 0 && rect2.bottom <= windowHeight;

      this.isVisible2 = isTopVisible2 || isBottomVisible2;

      if (this.isVisible2) {
        this.animationStarted2 = true;
        // Agrega aquí la lógica para iniciar la animación del div2
      }
    }
  }


  ngOnInit() {
    window.scrollTo(500, 500);
    this.mostrarNoticias();
    this.mostrarNoticiasMasVisitadas();
  }

  mostrarNoticias() {
    this.publicoService.getPublicNoticias().subscribe((noticias) => {
      this.noticias = noticias.map((noticia) => {
        if (noticia.fecha) {
          noticia.fecha = new Date(noticia.fecha);
        }
        return noticia;
      });
      this.noticias = noticias;
      this.coincidencias = noticias;
      // console.log(this.coincidencias);
      // this.loading = false;
    });
  }

  mostrarNoticiasMasVisitadas() {
    this.publicoService.noticiasMasVisitadas().subscribe((noticiasMasVisitadas) => {
      this.noticiasPrincipalesAll = noticiasMasVisitadas.map((noticiaMasVisitada) => {
        if (noticiaMasVisitada.fecha) {
          noticiaMasVisitada.fecha = new Date(noticiaMasVisitada.fecha); // Convertir la cadena de texto a un objeto Date
        }
        return noticiaMasVisitada;
      });
      this.noticiasMasVisitadas = noticiasMasVisitadas;
      // console.log(this.noticiasMasVisitadas);
      // this.loading = false;
    });
  }

  activarBuscador() {
    this.campoBuscar = true;
  }

  desactivarBuscador() {
    this.campoBuscar = false;
  }

  incrementarVisitas( id: number ) {
    this.publicoService.incrementarVisitas(id).subscribe(response => {
    });
  }

  // filtrar datos
  filterData(): void {
    this.coincidencias = this.noticias.filter(noticia =>
      noticia.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) 
    );
  }

}
