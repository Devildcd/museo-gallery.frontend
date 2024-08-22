import { Component } from '@angular/core';
import { Content, VideosEvento } from '../../interfaces/content.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MuseoService } from '../../services/museo.service';
import { catchError, switchMap, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-videos-evento',
  templateUrl: './videos-evento.component.html',
  styleUrls: ['./videos-evento.component.css']
})
export class VideosEventoComponent {

  contenido!: Content;
  videos: VideosEvento[] = [];
  eventoId: number | undefined = 0;
  i: number = 0;
  p: number = 1;
  loading = true;

  constructor(
    private router: Router,
    public museoService: MuseoService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.museoService.getSingleContent( id ))
      )
      .subscribe((contenido) => {
        this.contenido = contenido;
        this.eventoId = contenido.id;
        this.loading = false;
        
        this.mostrarVideosPorEventoId( this.eventoId);
    });
  }

  mostrarVideosPorEventoId( id:number | undefined ) {
    this.museoService.getVideosPorEventoId( id ).subscribe((videos) => {
      this.videos = videos;
     
    })
  }

  async saveVideo() {
    const { value: formValues } = await Swal.fire({
      title: 'Crear video',
      html:
      `<input id="swal-input1" class="swal2-input" placeholder="Content ID" type="hidden" value="${this.eventoId}">` +
        '<input id="swal-input2" class="swal2-input" placeholder="Título" style="width: 80%">' +
        '<input id="swal-input3" class="swal2-input" placeholder="URL" value="https://www.youtube.com/embed/" style = "width: 80%">',
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const url = (document.getElementById('swal-input3') as HTMLInputElement).value;
        if (!nombre || !url) {
          Swal.showValidationMessage('Por favor, llene todos los campos del formulario o revise la longitud de los textos');
        }
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          nombre,
          url
        ];
      }
    });
  
    if (formValues) {
      const [content_id, nombre, url] = formValues;
      const video: VideosEvento = { content_id, nombre, url };
      this.museoService.storeVideoEvento(video).subscribe(() => {
        this.mostrarVideosPorEventoId( this.eventoId)
        // Si todo está bien, agregar el video al array de videos
        this.videos.push(video);
        Swal.fire({
          title: 'Video creado',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }, (error) => {
       
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
      });
    }
  }

  async editVideo(video: VideosEvento) {
    const { value: formValues } = await Swal.fire({
      title: 'Editar video',
      html:
        `<input id="swal-input1" class="swal2-input" type="hidden" value="${video.content_id}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Título" style="width: 80%" value="${video.nombre}" required>` +
        `<input id="swal-input3" class="swal2-input" placeholder="URL" style="width: 80%" value="${video.url}" required>`,
      focusConfirm: false,
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const url = (document.getElementById('swal-input3') as HTMLInputElement).value;
        if (!nombre || !url) {
          Swal.showValidationMessage('Por favor, llene todos los campos del formulario o revise la longitud de los textos');
        }
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          nombre,
          url
        ];
      }
    });
  
    if (formValues) {
      const [content_id, nombre, url] = formValues;
      const updatedVideo: VideosEvento = { content_id, nombre, url };
      this.museoService.editVideoEvento(video.id, updatedVideo).subscribe(() => {
        this.mostrarVideosPorEventoId( this.eventoId);
        // Si todo está bien, actualizar el video en el array de videos
        const index = this.videos.findIndex(v => v.id === video.id);
        this.videos[index] = updatedVideo;
        Swal.fire({
          title: 'Video actualizado',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false
        });
      }, (error) => {
      
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
      });
    }
  }

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
          this.museoService.destroyVideoEvento( id ).subscribe(
            () => {
              // Eliminar el libro de la lista actual sin recargar la página
              const index = this.videos.findIndex(( video ) => video.id === id);
              if (index !== -1) {
                this.videos.splice(index, 1);
              }
             
              this.mostrarVideosPorEventoId( this.eventoId);
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
