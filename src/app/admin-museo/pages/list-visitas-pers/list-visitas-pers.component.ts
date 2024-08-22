import { Component } from '@angular/core';
import { Content } from '../../interfaces/content.interface';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MuseoService } from '../../services/museo.service';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-visitas-pers',
  templateUrl: './list-visitas-pers.component.html',
  styleUrls: ['./list-visitas-pers.component.css']
})
export class ListVisitasPersComponent {

  visitas: Content[] = [];
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
      .getVisits()
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
      .subscribe((visitas) => {
        this.visitas = visitas;
        this.coincidencias = visitas;
        
        // console.log(this.token);
        this.loading = false;
      });
  }

  filtrarDatos() {
    this.coincidencias = this.visitas.filter((visitas) => {
      return visitas.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
    });
  }

  deleteVisita(id: number | undefined) {
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
              const index = this.visitas.findIndex(( visita ) => visita.id === id);
              if (index !== -1) {
                this.visitas.splice(index, 1);
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
