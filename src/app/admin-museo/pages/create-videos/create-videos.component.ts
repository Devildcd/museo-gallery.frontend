import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MuseoService } from '../../services/museo.service';
import { Router } from '@angular/router';
import { Video } from '../../interfaces/video.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-videos',
  templateUrl: './create-videos.component.html',
  styleUrls: ['./create-videos.component.css']
})
export class CreateVideosComponent {

  video: Video = {
    titulo: '',
    videoUrl: ''
  }

  loading = true;

  constructor(
    private fb: FormBuilder,
    private museoService: MuseoService,
    private router: Router
  ) {}
  
  formCreate: FormGroup = this.fb.group({
    titulo: [''],
    videoUrl: ['https://www.youtube.com/embed/'],
  });

  saveVideo() {
    this.video = this.formCreate.value;
    this.museoService.storeVideo(this.video).subscribe(
      resp => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Video creado',
          showConfirmButton: false
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
      },error => {
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
            title: 'Llene todos los campos del formulario',
            text: 'Revise la longitud de los textos'
          });
        }
      }
    );
  }  
    
  
}
