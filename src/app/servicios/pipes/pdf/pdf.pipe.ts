import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Links
import { LINK } from 'src/app/config/config';

// Servicios
import { UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {
  token: any = '';

  constructor(
    public sanitizer: DomSanitizer,
    private usuarioServicesService: UsuarioServicesService
  ) {}

  transform(pdf: string, tipo: string = 'pdf'): any {
    let url;

    url = LINK + '/pdf';

    if ( !pdf ) {
      return url + '/pdf/xxx';
    }

    if ( pdf.indexOf('https') >= 0 ) {
      return pdf;
    }

    let file;
    this.token = this.usuarioServicesService.token;

    switch ( tipo ) {
      case 'pdf':
        url += '/' + pdf + '?token=' + this.token;

        file = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
        case 'xml':
          url += '/xml/' + pdf + '?token=' + this.token;

          // file = url;
          file = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
      default:
        console.log('Tipo de formato no existe');
        return url += '/pdf/xxx';
    }

    return file;
  }

}
