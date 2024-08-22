import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContenidoSala9Component } from '../../components/contenido-sala9/contenido-sala9.component';
import { ContenidoSala10Component } from '../../components/contenido-sala10/contenido-sala10.component';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent {

  constructor( public dialogSala9: MatDialog, public dialogSala10: MatDialog ) {}

  openDialogSala9() {
    this.dialogSala9.open(ContenidoSala9Component);
  }

  openDialogSala10() {
    this.dialogSala10.open(ContenidoSala10Component);
  }
}
