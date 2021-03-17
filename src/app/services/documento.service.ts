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
  private _documentos: Documento[] = [];
  documentos = new BehaviorSubject<Documento[]>(this._documentos);
  base = '';
  punto: PuntoService;
  indice: IndiceService;

  constructor(public http: HttpClient) {
    this.base = environment.base('documento');
    this.punto = new PuntoService(this);
    this.indice = new IndiceService(this);
  }
  buscar(termino: string) {
    const terminoWeb = encodeURIComponent(termino);
    return this.http
      .get<Documento[]>(this.base.concat('/?termino=').concat(terminoWeb))
      .pipe(
        map((r) => {
          this._documentos = r;
          this.documentos.next(r);
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

    console.log(url);

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
    this.base = root.base.concat('punto/referencia');
  }

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
