import { Directive, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginadorService {
  registrados: DatosPaginador[] = [];
  constructor() {}

  /**
   *Si existe retorna los valores, si no, lo crea y lo retorna.
   *
   * @memberof PaginadorService
   */
  registro(id: string): DatosPaginador {
    console.log(this.registrados)
    if (!id) throw 'Debes definir un id';
    let datos = this.registrados.find((x) => x.id === id);
    console.log({datosEncontrados:datos})
    if (datos) return datos;
    else {
      let d = new DatosPaginador();
      d.id = id
      this.registrados.push(d);
      return d;
    }
  }
}


@Directive()
export class DatosPaginador {
  cargando = false
  /**
   *El id con el que esta registrado el pagiandor
   *
   * @type {string}
   * @memberof Datos
   */
  id: string;

  /**
   *Elementos a mostrar por página
   *
   * @memberof PaginadorComponent
   */
  @Input() porPagina = [5, 10, 30];

  /**
   * Elementos por pagina seleccionado
   *
   * @memberof PaginadorComponent
   */
  elementosPorPagina = this.porPagina[0];

  /**
   * Pagina actual donde nos encontramos
   *
   * @memberof PaginadorComponent
   */
  paginaActual = 1;

  cantidadDePaginas = 0;

  private _totalElementos = 0;
  public get totalElementos() {
    return this._totalElementos;
  }

  /**
   *Calculo de los elementos a saltar según la pagina actual y los elementos escogidos
   *
   * @private
   * @memberof PaginadorComponent
   */
  skip = () => (this.paginaActual - 1) * this.elementosPorPagina;

}
