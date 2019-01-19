import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen/imagen.pipe';
import { PdfPipe } from './pdf/pdf.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    PdfPipe
  ],
  exports: [
    ImagenPipe,
    PdfPipe
  ]
})
export class PipesModule { }
