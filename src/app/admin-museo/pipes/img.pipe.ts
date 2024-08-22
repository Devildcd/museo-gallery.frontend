import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {
  transform(nombreImagen: string | undefined): string {
    // const baseUrl = 'http://localhost/ApiMuseo(Alpha)/public/storage/';
    const baseUrl = 'https://back.museo26dejulio.cult.cu/storage/';
    const defaultImage = "/assets/img/descarga.png";
    if (nombreImagen) {
      return baseUrl + nombreImagen.replace('public/', '');
    } else {
      return defaultImage;
    }
  }

}
