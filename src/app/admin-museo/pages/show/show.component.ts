import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { MuseoService } from '../../services/museo.service';
import { ActivatedRoute } from '@angular/router';
import { Content } from '../../interfaces/content.interface';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  contenido!: Content;
  loading = true;

  constructor(
    private museoService: MuseoService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.museoService.getSingleContent( id ))
      )
      .subscribe((contenido) => {
        this.contenido = contenido;
        if (contenido.fecha) {
          this.contenido.fecha = new Date(contenido.fecha);
        }
        this.loading = false;
       
      });
  }

}
