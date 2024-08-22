import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { MuseoService } from '../../services/museo.service';
import { Content } from '../../interfaces/content.interface';

@Component({
  selector: 'app-list-noticias',
  templateUrl: './list-noticias.component.html',
  styleUrls: ['./list-noticias.component.css']
})
export class ListNoticiasComponent {

  noticias: Content[] = [];
  terminoBusqueda: string = '';
  coincidencias: Content[] = [];
  i: number = 0;
  p: number = 1;
  loading = true;

  constructor( 
    private router: Router,
    public authService: AuthService,
    public museoService: MuseoService ) {}

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
      .getNews()
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
      .subscribe((noticias) => {
        this.noticias = noticias.map((noticia) => {
          if (noticia.fecha) {
            noticia.fecha = new Date(noticia.fecha); // Convertir la cadena de texto a un objeto Date
          }
          return noticia;
        });
        this.noticias = noticias;
        this.coincidencias = noticias;
        // console.log(this.token);
        this.loading = false;
      });
  }

  filtrarDatos() {
    this.coincidencias = this.noticias.filter((noticias) => {
      return noticias.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  deleteNoticia(id: number | undefined) {
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
          this.museoService.destroyContent( id ).subscribe(
            () => {
              // Eliminar el libro de la lista actual sin recargar la página
              const index = this.noticias.findIndex(( noticia ) => noticia.id === id);
              if (index !== -1) {
                this.noticias.splice(index, 1);
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
