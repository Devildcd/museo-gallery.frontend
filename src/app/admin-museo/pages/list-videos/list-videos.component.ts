import { Component } from '@angular/core';
import { Video } from '../../interfaces/video.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MuseoService } from '../../services/museo.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-videos',
  templateUrl: './list-videos.component.html',
  styleUrls: ['./list-videos.component.css']
})
export class ListVideosComponent {

  videos: Video[] = [];
  terminoBusqueda: string = '';
  coincidencias: Video[] = [];
  i: number = 0;
  p: number = 1;
  loading = true;

  constructor(
    private router: Router,
    public authService: AuthService,
    public museoService: MuseoService,
  ) {}

  ngOnInit() {
    this.mostrarVideos();
  }

  mostrarVideos() {
    this.museoService
      .getVideos()
      .pipe(
        catchError((error) => {
         
          if (error.error.message === 'Unauthenticated.') {
            Swal.fire({
              icon: 'error',
              title: '¡Tu sesión ha expirado!',
              text: 'Por favor, vuelve a iniciar sesión',
              showConfirmButton: false,
              timer: 1000, // Duración en milisegundos (1 segundo)
            }).then(() => {
              this.router.navigateByUrl('/autenticación/iniciar-sesión');
            });
          }
          return throwError('Ha ocurrido un error en la API');
        })
      )
      .subscribe((videos) => {
        this.videos = videos;
        this.coincidencias = videos;
       
        // console.log(this.token);
        this.loading = false;
      });
  }


  filtrarDatos() {
    this.coincidencias = this.videos.filter((video) => {
      return video.titulo
        .toLowerCase()
        .includes(this.terminoBusqueda.toLowerCase());
    });
  }

  // https://www.youtube.com/embed/
  deleteVideo(id: number | undefined) {
    if (id !== undefined) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.museoService.destroyVideo(id).subscribe(
            () => {
              // Eliminar de la lista actual sin recargar la página
              const index = this.videos.findIndex(
                (video) => video.id === id
              );
              if (index !== -1) {
                this.videos.splice(index, 1);
              }
             
            },
            (error) => {
             
              if (error?.error?.message === 'Unauthenticated.') {
                Swal.fire({
                  icon: 'error',
                  title: '¡Tu sesión ha expirado!',
                  text: 'Por favor, vuelve a iniciar sesión',
                  showConfirmButton: false,
                  timer: 1000, // Duración en milisegundos (1 segundo)
                }).then(() => {
                  this.router.navigateByUrl('/autenticación/iniciar-sesión');
                });
              }
            }
          );
        }
      });
    }
  }

}
