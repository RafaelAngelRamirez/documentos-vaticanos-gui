import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css'],
})
export class PaginadorComponent implements OnInit {
  /**
   *Elementos a mostrar por página
   *
   * @memberof PaginadorComponent
   */
  porPagina = [5, 15, 30, 50];

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

  /**
   *Calculo de los elementos a saltar según la pagina actual y los elementos escogidos
   *
   * @private
   * @memberof PaginadorComponent
   */
  private skip = () => (this.paginaActual - 1) * this.elementosPorPagina;

  constructor() {}

  /**
   *Los datos resultado de los cambios echos.
   *
   * @memberof PaginadorComponent
   */
  @Output() pagina = new EventEmitter<Paginacion>();

  private _totalElementos = 0;
  public get totalElementos() {
    return this._totalElementos;
  }
  @Input()
  public set totalElementos(value) {
    this._totalElementos = value;
    this.calcularCantidaDePaginas(value);
  }

  calcularCantidaDePaginas(totalDeElementos: number) {
    if (totalDeElementos > 0) {
      let totalDePaginas = Math.ceil(
        totalDeElementos / this.elementosPorPagina
      );

      let contador = 0;
      this.cantidadDePaginas = Array.from(new Array(totalDePaginas)).map(
        (x) => ++contador
      );

      this.paginaActual = 1;
    }
  }

  cantidadDePaginas = [];

  ngOnInit(): void {}

  /**
   *Cambia una pagina
   *
   * @param {number} i
   * @memberof PaginadorComponent
   */
  cambiarPagina(i: number) {
    this.paginaActual += i;

    if (this.paginaActual < 1) this.paginaActual = 1;

    const ultimaPagina = this.cantidadDePaginas[
      this.cantidadDePaginas.length - 1
    ];

    if (this.paginaActual > ultimaPagina) this.paginaActual = ultimaPagina;

    this.pagina.emit(this.generar());
  }

  /**
   *Cambia el numero de elementos por pagina.
   *
   * @param {number} i
   * @memberof PaginadorComponent
   */
  cambiarLimite(i: number) {
    this.elementosPorPagina = this.porPagina[i];
    this.calcularCantidaDePaginas(this.totalElementos);
    this.pagina.emit(this.generar());
  }

  generar() {
    return { limit: this.elementosPorPagina, skip: this.skip() };
  }
}

export interface Paginacion {
  limit: number;
  skip: number;
}
