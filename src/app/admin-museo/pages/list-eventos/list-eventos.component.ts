import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Content } from '../../interfaces/content.interface';
import { MuseoService } from '../../services/museo.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-list-eventos',
  templateUrl: './list-eventos.component.html',
  styleUrls: ['./list-eventos.component.css'],
})
export class ListEventosComponent {
  eventos: Content[] = [];
  terminoBusqueda: string = '';
  coincidencias: Content[] = [];
  i: number = 0;
  p: number = 1;
  loading = true;

  selectedFile: File | null = null;
  libro_id: number | null = null;

  constructor(
    private router: Router,
    public authService: AuthService,
    public museoService: MuseoService,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    this.mostrarEventos();

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const usuarioObj = JSON.parse(usuario);
      this.authService.usuario = {
        user: usuarioObj,
      };
    }
  }

  mostrarEventos() {
    this.museoService
      .getEvents()
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
      .subscribe((eventos) => {
        this.eventos = eventos.map((evento) => {
          if (evento.fecha) {
            evento.fecha = new Date(evento.fecha); // Convertir la cadena de texto a un objeto Date
          }
          return evento;
        });
        this.eventos = eventos;
        this.coincidencias = eventos;
        // console.log(this.token);
        this.loading = false;
      });
  }

  filtrarDatos() {
    this.coincidencias = this.eventos.filter((evento) => {
      return evento.nombre
        .toLowerCase()
        .includes(this.terminoBusqueda.toLowerCase());
    });
  }

  deleteEvento(id: number | undefined) {
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
          this.museoService.destroyContent(id).subscribe(
            () => {
              // Eliminar el libro de la lista actual sin recargar la página
              const index = this.eventos.findIndex(
                (evento) => evento.id === id
              );
              if (index !== -1) {
                this.eventos.splice(index, 1);
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
