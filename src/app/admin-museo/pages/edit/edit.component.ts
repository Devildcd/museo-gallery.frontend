import { Component } from '@angular/core';
import { Content, ImagenFile } from '../../interfaces/content.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MuseoService } from '../../services/museo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {

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

  loading = true;
  id: number | undefined = 0; 
  selectedFiles!: FileList;
  previewImgs: string[] = [];
  cantEventosPrincipales: number = 0;
  cantNoticiasPrincipales: number = 0;
  cantVisitasPrincipales: number = 0;
  
  constructor(
    private fb: FormBuilder,
    private museoService: MuseoService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.museoService.getSingleContent( id ))
      )
      .subscribe((contenido) => {
        this.contenido = contenido;
        this.id = contenido.id;
        this.loading = false;
        this.formEdit.setValue({
          nombre: contenido.nombre,
          info: contenido.info,
          fecha: new Date(contenido.fecha!),
          detalles: contenido.detalles,
          principal: contenido.principal,
          programado: contenido.programado,
          prioridad: contenido.prioridad,
          tipo: contenido.tipo,
        });
      });

      this.museoService.countEventosNoticiasPrincipales().subscribe(data => {
        this.cantEventosPrincipales = data[0];
        this.cantNoticiasPrincipales = data[1];
      });
  
      this.museoService.countVisitasPrincipales().subscribe( data => {
        this.cantVisitasPrincipales = data;
      } )
  }

  formEdit: FormGroup = this.fb.group({
    nombre: [''],
    info: [''],
    fecha: [''],
    detalles: [''],
    tipo: [''],
    principal: [false],
    programado: [false],
    prioridad: [false]
  });

  editContent() {
    const id = this.contenido?.id;
    if (id === undefined) {
      return;
    }
    const contenido = this.formEdit.value;
    this.museoService.editContent( id, contenido ).subscribe(
      updatedContent => {
        this.saveImages();
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contenido actualizado',
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          if (contenido.tipo === 'Evento') {
            this.router.navigate(['/manager/eventos']);
          } 
          else if (contenido.tipo === 'Noticia') {
            this.router.navigate(['/manager/noticias']);
          } 
          else if (contenido.tipo === 'Visita') {
            this.router.navigate(['/manager/visitas-personalidades']);
          } 
          else {
            this.router.navigate(['/manager/muestras-mensuales']);
          }
        }, 1000);
      },
      error => {
        if (error.error.message === 'Unauthenticated.') {
          Swal.fire({
            icon: 'error',
            title: '¡Tu sesión ha expirado!',
            text: 'Por favor, vuelve a iniciar sesión',
            showConfirmButton: false,
            timer: 1000 
          }).then(() => {
            this.router.navigateByUrl('/autenticación/iniciar-sesión');
          });
        } else if (error.error) {
          Swal.fire({
            icon: 'error',
            title: 'Revise los campos del formulario',
          });
        }
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.previewImages();
  }

  previewImages() {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (typeof event.target?.result === 'string') {
            this.previewImgs[i] = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    this.previewImgs.splice(index, 1);
    const filesArray = Array.from(this.selectedFiles);
    filesArray.splice(index, 1);
    const dataTransfer = new DataTransfer();
    filesArray.forEach(file => {
      dataTransfer.items.add(file);
    });
    this.selectedFiles = dataTransfer.files;
  }

  saveImages() {
    if (this.contenido.id === undefined || this.contenido.id === null) {
      return;
    }

    const formData = new FormData();
    formData.append('content_id', this.contenido.id.toString());
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('img[]', this.selectedFiles[i]);
      }
    }
    this.museoService.uploadImageOnly(formData).subscribe(
      (response) => {
        // console.log(response);
      },
    );
  }

  deleteImage( id: number ) {
    this.museoService.destroyImage(id).subscribe(() => {
      this.contenido.imagenes = this.contenido.imagenes!.filter(imagen => imagen.id !== id); // Eliminar la imagen del array de imágenes en el objeto de contenido
    });
  }

  onCheckboxChange() {
    // Verifica si la condición es válida antes de permitir marcar el checkbox
    if (this.formEdit.get('principal')?.value && this.formEdit.get('tipo')?.value === 'Evento' && this.cantEventosPrincipales === 4) {
      Swal.fire({
        icon: 'error',
        title: 'No puedes marcar el checkbox',
        text: 'La cantidad máxima de eventos principales ya ha sido alcanzada.',
        confirmButtonColor: '#000',
      });

      // Desmarca el checkbox
      this.formEdit.get('principal')?.setValue(false);
    }

    if (this.formEdit.get('principal')?.value && this.formEdit.get('tipo')?.value === 'Noticia' && this.cantNoticiasPrincipales === 4) {
      Swal.fire({
        icon: 'error',
        title: 'No puedes marcar el checkbox',
        text: 'La cantidad máxima de noticias principales ya ha sido alcanzada.',
        confirmButtonColor: '#000',
      });

      // Desmarca el checkbox
      this.formEdit.get('principal')?.setValue(false);
    }
  }
  
  
}
