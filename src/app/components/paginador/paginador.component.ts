import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginadorService, DatosPaginador } from '../paginador.service';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: ['./paginador.component.css'],
})
export class PaginadorComponent implements OnInit {
  constructor(public ps: PaginadorService) {}
  /**
   *Datos de paginacion obtenidos del servicio
   *
   * @type {Datos}
   * @memberof PaginadorComponent
   */
  dp: DatosPaginador;

  id: string = '';
  @Input()
  public set datos(value: Datos) {
    this.id = value.id;
    this.dp = this.ps.registro(this.id);
    this.dp.totalElementos = value.totalElementos;
    this.calcularCantidaDePaginas(value.totalElementos);
    if (value.porPagina) this.dp.porPagina = value.porPagina;
  }

  /**
   *Los datos resultado de los cambios echos.
   *
   * @memberof PaginadorComponent
   */
  @Output() pagina = new EventEmitter<Paginacion>();

  calcularCantidaDePaginas(totalDeElementos: number) {
    if (totalDeElementos > 0) {
      let totalDePaginas = Math.ceil(
        totalDeElementos / this.dp.elementosPorPagina
      );
      this.dp.cantidadDePaginas = totalDePaginas;
      // Evitamos emitir para que solo se recalcule la pagina
      this.cambiarPagina(0, false);
    }
  }

  ngOnInit(): void {}

  /**
   *Cambia una pagina
   *
   * @param {number} i
   * @memberof PaginadorComponent
   */
  cambiarPagina(i: number, emitir = true) {
    if (this.dp.cargando) return;
    this.dp.paginaActual += i;

    if (this.dp.paginaActual < 1) this.dp.paginaActual = 1;

    if (this.dp.paginaActual > this.dp.cantidadDePaginas)
      this.dp.paginaActual = this.dp.cantidadDePaginas;

    if (emitir) this.pagina.emit(this.generar());
  }

  /**
   *Cambia el numero de elementos por pagina.
   *
   * @param {number} i
   * @memberof PaginadorComponent
   */
  cambiarLimite(i: number) {
    if (this.dp.cargando) return;
    this.dp.elementosPorPagina = this.dp.porPagina[i];
    this.calcularCantidaDePaginas(this.dp.totalElementos);
    this.pagina.emit(this.generar());
  }

  generar() {
    return {
      limit: this.dp.elementosPorPagina,
      skip: this.dp.skip(),
    };
  }
}

export interface Paginacion {
  limit: number;
  skip: number;
}

interface Datos {
  porPagina: number[];
  totalElementos: number;
  // Id que identifique el paginador
  id: string;
}
