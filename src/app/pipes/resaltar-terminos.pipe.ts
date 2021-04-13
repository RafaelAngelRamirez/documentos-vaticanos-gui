import { Pipe, PipeTransform } from '@angular/core';
import { DocumentoService } from '../services/documento.service';

@Pipe({
  name: 'resaltarTerminos',
})
export class ResaltarTerminosPipe implements PipeTransform {
  constructor(private docService: DocumentoService) {}

  transform(texto: string): unknown {
    if (!texto) return;
    let textoRemplazado = texto;
    this.docService.filtros.terminos.forEach((x) => {
      if (x) {
        // Si no esta vacio entra
        let regex = new RegExp(x.toLowerCase(), 'i');
        textoRemplazado = textoRemplazado.replace(regex, '<mark>$&</mark>');
      }
    });

    return textoRemplazado;
  }
}
