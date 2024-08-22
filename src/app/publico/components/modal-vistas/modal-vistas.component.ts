import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Content } from 'src/app/admin-museo/interfaces/content.interface';
import { MuseoService } from 'src/app/admin-museo/services/museo.service';

@Component({
  selector: 'app-modal-vistas',
  templateUrl: './modal-vistas.component.html',
  styleUrls: ['./modal-vistas.component.css']
})
export class ModalVistasComponent {

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

  constructor( private museoService: MuseoService, private activeRoute: ActivatedRoute,  @Inject(MAT_DIALOG_DATA) public data: { id: number } ) {}

  ngOnInit() {
    if (this.data && this.data.id !== undefined) {
      const id = this.data.id;
    }
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.museoService.getSingleContent( id ))
      )
      .subscribe((contenido) => {
        if (contenido.fecha) {
          contenido.fecha = new Date(contenido.fecha);
        }
        this.contenido = contenido;
        this.id = contenido.id;
        
      });

  }
}
