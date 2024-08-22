import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Content,ImagenFile } from 'src/app/admin-museo/interfaces/content.interface';
import { PublicoService } from '../../services/publico.service';

@Component({
  selector: 'app-programacion-cultural',
  templateUrl: './programacion-cultural.component.html',
  styleUrls: ['./programacion-cultural.component.css'],
})

export class ProgramacionCulturalComponent {
  eventos: Content[] = [];
  eventosPrincipales: Content[] = [];
  eventosProgramados: Content[] = [];
  terminoBusqueda: string = '';
  coincidencias: Content[]= [];
  imagenesEvento: ImagenFile[] = [];
  p: number = 1;
  campoBuscar: boolean = false;
  visitas: number = 0;
  loading = true;
  // Variables para efectos y eventos js
  isImageHovered = false;
  imageHoverStates: { [key: string]: boolean } = {};
  isHovered: boolean = false;
  isHoveredStatesPrincipal :{ [key: string]: boolean } = {}
  isVisible1 = false;
  isVisible2 = false;
  private animationStarted1 = false;
  private animationStarted2 = false;
  

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
    this.mostrarEventos();
    this.mostrarEventosPrincipales();
    this.mostrarImagenesEvento();
    this. mostrarEventosProgramados();
  }

  mostrarEventos() {
    this.publicoService.getPublicEvents().subscribe((eventos) => {
      this.eventos = eventos.map((evento) => {
        if (evento.fecha) {
          evento.fecha = new Date(evento.fecha);
        }
        return evento;
      });
      this.eventos = eventos;
      this.coincidencias = eventos;
      // console.log(this.eventos);
    });
  }

  mostrarEventosPrincipales() {
    this.publicoService.eventosPrincipalesTodos().subscribe((eventosPrincipales) => {
      this.eventosPrincipales = eventosPrincipales.map((eventoPrincipal) => {
        if (eventoPrincipal.fecha) {
          eventoPrincipal.fecha = new Date(eventoPrincipal.fecha); // Convertir la cadena de texto a un objeto Date
        }
        return eventoPrincipal;
      });
      this.eventosPrincipales = eventosPrincipales;
      // console.log(this.eventosPrincipales);
    });
  }

  mostrarEventosProgramados() {
    this.publicoService.eventosProgramados().subscribe((eventosProgramados) => {
      this.eventosProgramados = eventosProgramados.map((eventoProgramado) => {
        if (eventoProgramado.fecha) {
          eventoProgramado.fecha = new Date(eventoProgramado.fecha); // Convertir la cadena de texto a un objeto Date
        }
        return eventoProgramado;
      });
      this.eventosProgramados = eventosProgramados;
      // console.log(this.eventosProgramados);
    });
  }

  mostrarImagenesEvento() {
    this.publicoService.getImagenesEventoPrincipal().subscribe((eventos) => {
      this.imagenesEvento = eventos;
      // console.log(this.imagenesEvento);
      this.loading = false;
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
    this.coincidencias = this.eventos.filter(evento =>
      evento.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) 
    );
  }
  
}
