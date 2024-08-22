import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private selectedLibroIdSource = new Subject<number | null>();
  selectedLibroId$ = this.selectedLibroIdSource.asObservable();
  notificacion: Subject<any> = new Subject<any>();
  modalVisible: boolean = false;

  oculto: string = 'oculto';
  previewImgs: string[] = [];
  exito = false;
  errorMensaje: string = '';
  validFile: string = '';
  
  constructor() {
  }

  updateSelectedLibroId(libroId: number | null) {
    this.selectedLibroIdSource.next(libroId);
  }

  getSelectedLibroId(): Observable< number | null> {
  return this.selectedLibroIdSource.asObservable();
}
  
//funciones para la imagen
  ocultarModal() {
    this.oculto = 'oculto';
    this.previewImgs = [];
  }

  mostrarModal() {
    this.oculto = '';
  }
  
}
