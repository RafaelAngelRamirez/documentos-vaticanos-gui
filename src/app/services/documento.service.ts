import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Documento, DocumentoSimple, Punto } from '../models/documento.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  /**
   **Almacena los resultados de busqueda de documentos y puntos en las
   *diferentes propiedades que permite la interfaz.
   *
   * @private
   * @type {DocumentosBusqueda}
   * @memberof DocumentoService
   */
  private _resultadoBusquedaDocumentos: DocumentosBusqueda = {} as DocumentosBusqueda;
  documentosBusqueda = new BehaviorSubject<DocumentosBusqueda>(
    this._resultadoBusquedaDocumentos
  );
  base = '';
  punto: PuntoService;
  indice: IndiceService;

  public filtros = new DocumentosFiltros();

  constructor(public http: HttpClient) {
    this.base = environment.base('documento');
    this.punto = new PuntoService(this);
    this.indice = new IndiceService(this);
  }

  buscar(filtros: DocumentosFiltros) {
    this.filtros = filtros;
    console.log({ filtros });
    return this.http
      .get<DocumentosBusqueda>(this.base.concat(filtros.obtenerFiltros()))
      .pipe(
        map((r) => {
          this._resultadoBusquedaDocumentos = r;
          this.documentosBusqueda.next(r);
          return r;
        })
      );
  }

  buscarPorUrl(url: string) {
    return this.http.get<Documento>(
      this.base.concat('/url/' + encodeURIComponent(url))
    );
  }

  guardarModificar(documento: Documento) {
    return this.http.put<Documento>(this.base, documento);
  }

  eliminar(idDocumento: string) {
    return this.http.delete<null>(this.base.concat('/eliminar/' + idDocumento));
  }

  obtenerPuntos(idDocumento: string, idPunto?: string) {
    let url = this.base
      .concat(`/id/${idDocumento}/punto/`)
      .concat(idPunto ? `${idPunto}` : '');

    return this.http.get<Punto[]>(url);
  }
}

class PuntoService {
  referencia: ReferenciaService;
  base = '';

  constructor(private root: DocumentoService) {
    this.base = root.base.concat('/punto/');
    this.referencia = new ReferenciaService(root);
  }

  nuevo(documento: DocumentoSimple) {
    delete documento.punto._id;
    return this.root.http.put<Documento>(this.base.concat('nuevo'), documento);
  }

  modificar(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(
      this.base.concat('modificar'),
      documento
    );
  }
  eliminar(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(
      this.base.concat('eliminar'),
      documento
    );
  }
}

class ReferenciaService {
  base = '';
  constructor(public root: DocumentoService) {
    this.base = root.base.concat('/referencia/');
  }

  nuevo(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(this.base.concat('nueva'), documento);
  }

  modificar(documento: DocumentoSimple) {
    return this.root.http.put<null>(this.base.concat('modificar'), documento);
  }
  eliminar(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(
      this.base.concat('eliminar'),
      documento
    );
  }
}

class IndiceService {
  constructor(private root: DocumentoService) {}
  base = this.root.base.concat('/indice/');
  nuevo(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(this.base.concat('nuevo'), documento);
  }

  modificar(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(
      this.base.concat('modificar'),
      documento
    );
  }
  eliminar(documento: DocumentoSimple) {
    return this.root.http.put<Documento>(
      this.base.concat('eliminar'),
      documento
    );
  }
}

export interface DocumentosBusqueda {
  documentos: Documento[];
  documentos_total: number;
  todosLosTerminosExactos: Documento[];
  todosLosTerminosExactos_total: number;
  todosLosTerminosParcial: Documento[];
  todosLosTerminosParcial_total: number;
  palabraCompleta: Documento[];
  palabraCompleta_total: number;
  palabraParcial: Documento[];
  palabraParcial_total: number;
}

export class DocumentosFiltros {
  private termino = new Set<string>();
  private puntos = new Set<string>();
  private opciones = new Set<string>();

  private documentos = new Set<string>();
  private limit: number = 30;
  private skip: number = 0;

  constructor() {}

  /**
   *Agrega un termino de busqueda
   *
   * @param {string} termino
   * @returns
   * @memberof DocumentosFiltros
   */
  addTermino(termino: string) {
    termino
      .trim()
      .split(',')
      .map((x) => x.trim())
      .forEach((x) => this.termino.add(x));
    return this;
  }

  get terminos() {
    return Array.from(this.termino);
  }

  /**
   *Agrega puntos para obtenerlos especificamente. Utilizar con 
   `this.addDocumento()` para mejores resutlados.
   *
   * @param {Punto['_id']} punto
   * @memberof DocumentosFiltros
   */
  addPunto(punto: Punto['consecutivo']) {
    this.puntos.add(punto);
  }

  /**
   * Opciones para la busqueda
   *
   * @param {('todosLosTerminosExactos'
   *       | 'todosLosTerminosParcial'
   *       | 'palabraCompleta'
   *       | 'palabraParcial')} opcion
   * @returns
   * @memberof DocumentosFiltros
   */
  addOpciones(
    opcion:
      | 'todosLosTerminosExactos'
      | 'todosLosTerminosParcial'
      | 'palabraCompleta'
      | 'palabraParcial'
  ) {
    this.opciones.add(opcion);
    return this;
  }

  /**
   * Agrega documentos para limitar la busqueda.
   *
   * @param {Documento['_id']} documento
   * @returns
   * @memberof DocumentosFiltros
   */
  addDocumento(documento: Documento['_id']) {
    this.documentos.add(documento);
    return this;
  }

  /**
   *Define el limite de elementos a mostrar
   *
   * @param {number} limit
   * @returns
   * @memberof DocumentosFiltros
   */
  setLimit(limit: number) {
    this.limit = limit;
    return this;
  }
  /**
   *Define la cantidad de elementos que serán ignorados antes de mostrar los
   * resultados
   *
   * @param {number} skip
   * @returns
   * @memberof DocumentosFiltros
   */
  setSkip(skip: number) {
    this.skip = skip;
    return this;
  }

  /**
   *Obtiene una cadena formatead para agregar a la url como parametros
   *
   * @returns {string}
   * @memberof DocumentosFiltros
   */
  obtenerFiltros(): string {
    let cadena = [];

    if (this.termino.size > 0) {
      cadena.push(
        'termino=' + encodeURIComponent(Array.from(this.termino).join(','))
      );
    }
    if (this.puntos.size > 0) {
      cadena.push('puntos=' + Array.from(this.puntos).join(','));
    }

    if (this.opciones.size > 0) {
      cadena.push('opciones=' + Array.from(this.opciones).join(','));
    }
    if (this.documentos.size > 0) {
      cadena.push('documentos=' + Array.from(this.documentos).join(','));
    }

    cadena.push('limit=' + this.limit);
    cadena.push('skip=' + this.skip);

    return '?' + cadena.join('&');
  }
}
