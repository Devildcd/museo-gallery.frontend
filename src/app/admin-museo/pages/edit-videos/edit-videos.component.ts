import { Component } from '@angular/core';
import { Video } from '../../interfaces/video.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MuseoService } from '../../services/museo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-videos',
  templateUrl: './edit-videos.component.html',
  styleUrls: ['./edit-videos.component.css']
})
export class EditVideosComponent {

  video: Video = {
    titulo: '',
    videoUrl: ''
  }

  loading = true;
  id: number | undefined = 0; 

  constructor(
    private fb: FormBuilder,
    private museoService: MuseoService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.museoService.getSingleVideo( id ))
      )
      .subscribe((video) => {
        this.video = video;
        this.id = video.id;
        this.loading = false;
        this.formEdit.setValue({
          titulo: video.titulo,
          videoUrl: video.videoUrl,
        });
      });
  }

  formEdit: FormGroup = this.fb.group({
    titulo: [''],
    videoUrl: ['https://www.youtube.com/embed/'],
  });


  editVideo() {
    const id = this.video?.id;
    if (id === undefined) {
      return;
    }
    const video = this.formEdit.value;
    this.museoService.editVideo(id, video).subscribe(
      updatedVideo => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Video actualizado',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          this.router.navigate(['/manager/videos']);
        }, 1000);
      },
      error => {
        if (error.error.message === 'Unauthenticated.') {
          Swal.fire({
            icon: 'error',
            title: '¡Tu sesión ha expirado!',
            text: 'Por favor, vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 1000 // Duración en milisegundos (1 segundo)
          }).then(() => {
            this.router.navigateByUrl('/autenticación/iniciar-sesión');
          });
        } else if (error.error) {
          Swal.fire({
            icon: 'error',
            title: 'Llene los campos del formulario',
            text: 'Revise la longitud de los textos'
          });
        }
      }
    );
  }
}
