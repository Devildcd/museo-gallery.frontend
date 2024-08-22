import { Component } from '@angular/core';
import { Contador } from 'src/app/publico/interfaces/contador.interface';
import { PublicoService } from 'src/app/publico/services/publico.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private publicoService: PublicoService) {}

  contador!: Contador;
  visitasSemanales: number = 0;
  visitasMensuales: number = 0;
  visitasAnuales: number = 0;

  ngOnInit(): void {
    // Verificar si la ruta 'museo/inicio' aún no ha sido visitada en esta sesión
    if (!sessionStorage.getItem('museo/inicio')) {
      this.contarVisitasDiarias();
    }
    this.calcularVisitasSemanales();
    this.obtenerVisitasDiarias();
    this.calcularVisitasMensuales();
    this.calcularVisitasAnuales();
  }

  contarVisitasDiarias(): void {
    // Llamar a la función para contar visitas diarias
    this.publicoService.postVisitasDiarias().subscribe(data => {
      // console.log('Visitas contadas:', data);
    });

    // Marcar la ruta 'inicio' como visitada en esta sesión
    sessionStorage.setItem('museo/inicio', 'visited');
  }


  obtenerVisitasDiarias() {
    this.publicoService.getVisitasDiarios().subscribe( resp => {
      this.contador = resp;
      // console.log(resp);
    })
  }

  calcularVisitasSemanales() {
    this.publicoService.getVisitasSemanales().subscribe( resp => {
      this.visitasSemanales = resp;
      // console.log(resp);
    })
  }

  calcularVisitasMensuales() {
    this.publicoService.getVisitasMensuales().subscribe( resp => {
      this.visitasMensuales = resp;
      // console.log(resp);
    })
  }

  calcularVisitasAnuales() {
    this.publicoService.getVisitasAnuales().subscribe( resp => {
      this.visitasAnuales = resp;
      // console.log(resp);
    })
  }

  
}
