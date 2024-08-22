import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MuseoService } from '../../services/museo.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {

  selectedFiles!: FileList;
  previewImgs: string[] = [];
  cantEventosPrincipales: number = 0;
  cantNoticiasPrincipales: number = 0;
  cantVisitasPrincipales: number = 0;

  loading = true;

  constructor(
    private fb: FormBuilder,
    private museoService: MuseoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.museoService.countEventosNoticiasPrincipales().subscribe(data => {
      this.cantEventosPrincipales = data[0];
      this.cantNoticiasPrincipales = data[1];
    });

    this.museoService.countVisitasPrincipales().subscribe( data => {
      this.cantVisitasPrincipales = data;
    } )
  }

  formCreate: FormGroup = this.fb.group({
    nombre: [''],
    info: [''],
    fecha: [''],
    detalles: [''],
    principal: [false],
    programado: [false],
    prioridad: [false],
    tipo: [''],
  });

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
  
  saveContent() {
    const formData = new FormData();
    formData.append('nombre', this.formCreate.value.nombre);
    formData.append('info', this.formCreate.value.info);
    formData.append('fecha', this.formCreate.value.fecha);
    formData.append('detalles', this.formCreate.value.detalles);
    formData.append('tipo', this.formCreate.value.tipo);
    formData.append('principal', this.formCreate.value.principal ? '1' : '0');
    formData.append('programado', this.formCreate.value.programado ? '1' : '0');
    formData.append('prioridad', this.formCreate.value.prioridad ? '1' : '0');
    if (this.selectedFiles && this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('img[]', this.selectedFiles[i]);
      }
    }
    this.museoService.storeContent(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Contenido creado',
          showConfirmButton: false
        });
        setTimeout(() => {
          location.reload();
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
        }else if (error.error) {
          Swal.fire({
            icon: 'error',
            title: 'Llene todos los campos del formulario',
            text: 'El campo nombre debe tener entre 20 y 100 caracteres'
          });
        }
      }
    );
  }

}
