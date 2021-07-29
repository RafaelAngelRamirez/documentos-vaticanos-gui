import { Pipe, PipeTransform } from '@angular/core';
import { DocumentoService } from '../services/documento.service';

@Pipe({
  name: 'resaltarTerminos',
})
export class ResaltarTerminosPipe implements PipeTransform {
  constructor(private docService: DocumentoService) {}

  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  transform(texto: string, textoSinDiacriticos: string): unknown {
    if (!texto) return;
    if (
      !(
        this.docService.filtros.terminos.length > 0 &&
        this.docService.filtros.terminos[0] !== ''
      )
    )
      return texto;

    let marcador = (i) => `[XX${i}XX]`;

    let datosSinDiacritico = textoSinDiacriticos.toLowerCase();
    this.docService.filtros.terminos.forEach((termino) => {
      let terminoSinDiacritico = this.eliminarDiacriticos(termino);
      datosSinDiacritico = datosSinDiacritico
        .split(terminoSinDiacritico)
        .join(marcador(terminoSinDiacritico));
    });

    let arregloNormal = texto.split(' ');
    let arregloSinDiacriticos = datosSinDiacritico.split(' ');

    let arregloUnion = [];

    for (let i = 0; i < arregloNormal.length; i++) {
      arregloUnion.push({
        normal: arregloNormal[i],
        sinDiacritico: arregloSinDiacriticos[i],
      });
    }

    let etiqueta = (e) => `<mark>${e}</mark>`;

    arregloUnion = arregloUnion.map((x) => {
      if (x.sinDiacritico.includes('[XX')) {
        x['arreglo'] = x.sinDiacritico.split(/\[XX|XX]/);
        let primerEspacio = x['arreglo'][0].length;
        let ultimoEspacio = x['arreglo'][x['arreglo'].length - 1].length;

        x['primerEspacio'] = primerEspacio;
        x['ultimoEspacio'] = ultimoEspacio;

        if (!primerEspacio && !ultimoEspacio) {
          x['resultado'] = etiqueta(x.normal);
        }

        if (!primerEspacio && ultimoEspacio > 0) {
          let primeraParte = x.normal.substring(
            0,
            x.normal.length - ultimoEspacio
          );
          let segundaParte = x.normal.substring(
            x.normal.length - ultimoEspacio,
            x.normal.length
          );

          x['resultado'] = etiqueta(primeraParte) + segundaParte;
        }
        if (primerEspacio > 0 && ultimoEspacio > 0) {
          let primeraParte = x.normal.substring(0, primerEspacio);
          let segundaParte = x.normal.substring(
            x.normal.length - ultimoEspacio,
            x.normal.length
          );
          let resalte = x.normal.substring(
            primerEspacio,
            x.normal.length - ultimoEspacio
          );
          x['resultado'] =
            primeraParte + etiqueta(resalte) + segundaParte + ' x2';
        }
      }

      return x;
    });

    return arregloUnion
      .map((x) => {
        let resultado = x.resultado ?? x.normal;
        return resultado;
      })
      .join(' ');
  }
}
