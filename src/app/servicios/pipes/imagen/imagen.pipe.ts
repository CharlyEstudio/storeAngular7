import { Pipe, PipeTransform } from '@angular/core';

// Links
import { LINK } from 'src/app/config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url;

    url = LINK + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe usuario');
        return url += '/usuarios/xxx';
    }

    return url;
  }

}
