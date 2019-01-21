import { Injectable } from '@angular/core';

// Exportar XLSX, XLS, CSV & XML
import * as EXPORT from 'xlsx';

@Injectable()
export class ExportarService {

  constructor() { }

  static toExportFileName(fileName: string, tipo: any): string {
    return `${fileName}_export_${new Date().getTime()}.${tipo}`;
  }

  public exportAsFile(data: any[], fileName: string, tipo: any): void {

    const sheet: EXPORT.WorkSheet = EXPORT.utils.json_to_sheet(data);
    const book: EXPORT.WorkBook = { Sheets: { 'data': sheet }, SheetNames: [ 'data' ] };

    EXPORT.writeFile(book, ExportarService.toExportFileName(fileName, tipo));

  }
}
