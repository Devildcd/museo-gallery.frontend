import { Component, ElementRef, HostListener } from '@angular/core';
import { PublicoService } from '../../services/publico.service';
import { Content, ImagenFile } from 'src/app/admin-museo/interfaces/content.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalVistasComponent } from '../../components/modal-vistas/modal-vistas.component';

@Component({
  selector: 'app-museo',
  templateUrl: './museo.component.html',
  styleUrls: ['./museo.component.css']
})
export class MuseoComponent {

  visitas: Content[] = [];
  imagenesVisita: ImagenFile[] = [];
  loading = true;
  isVisible1 = false;
  isVisible2 = false;
  private animationStarted1 = false;
  private animationStarted2 = false;
  imageHoverBanner = false;
  

  constructor(  private publicoService: PublicoService, public dialog: MatDialog,  private el: ElementRef  ) {}

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
    this.mostrarVisitas();
    this.mostrarImagenesVisita();
  }

  mostrarVisitas() {
    this.publicoService
      .getPublicVisitas()
      .subscribe(( visitas ) => {
        this.visitas = visitas;
        // console.log(this.visitas);
        this.loading = false;
      });
  }

  mostrarImagenesVisita() {
    this.publicoService
      .getImagenesVisitaPrincipal()
      .subscribe(( visitas ) => {
        this.imagenesVisita = visitas;
        // console.log( this.imagenesVisita );
        this.loading = false;
      });
  }

  openDialog(id: number | undefined): void {
    const dialogRef = this.dialog.open(ModalVistasComponent, {
      data: { id: id } // Mover esta línea dentro de la llamada a `open`
    });
  
    dialogRef.afterClosed().subscribe(result => {
     
    });
  }

  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 3,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 2,
          "slidesToScroll": 2
        }
      },

      {
        "breakpoint": 768,
        "settings": {
          "arrow": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]};
}
