import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Links
import { LINK } from 'src/app/config/config';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {
  constructor(
    public sanitizer: DomSanitizer
  ) {}

  transform(pdf: string, tipo: string = 'pdf'): any {
    let url;
    console.log(pdf);

    url = LINK + '/pdf';

    if ( !pdf ) {
      return url + '/pdf/xxx';
    }

    if ( pdf.indexOf('https') >= 0 ) {
      return pdf;
    }

    let file;

    switch ( tipo ) {
      case 'pdf':
        url += '/' + pdf;

        file = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
      case 'xml':
        url += '/' + pdf;

        file = url;
        break;
      default:
        console.log('Tipo de formato no existe');
        return url += '/pdf/xxx';
    }

    return file;
  }

}
