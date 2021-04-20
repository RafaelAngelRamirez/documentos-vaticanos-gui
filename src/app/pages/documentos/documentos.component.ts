import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@codice-progressio/modal';
import { Documento } from '../../models/documento.model';
import { DocumentosBusqueda, Opciones } from '../../services/documento.service';
import { Paginacion } from '../../components/paginador/paginador.component';
import {
  DocumentoService,
  DocumentosFiltros,
} from '../../services/documento.service';
import { PaginadorService } from 'src/app/components/paginador.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  constructor(
    private paginadorService: PaginadorService,
    public documentoService: DocumentoService,
    private modalService: ModalService
  ) {}

  documentos: Documento[] = [];
  documentosBusqueda: DocumentosBusqueda;
  idModalCrear = 'idModalCrear';
  cargando = false;

  ngOnInit(): void {
    // Si en el servicio alguna de las operaciones arroja algún
    // resultado nos suscribimos automaticamente.

    this.documentosBusqueda = {} as DocumentosBusqueda;
    this.documentoService.documentosBusqueda.subscribe((busqueda) => {
      this.documentosBusqueda.documentos = busqueda.documentos;
      this.clavesResultadoBusqueda.forEach((clave) => {
        if (busqueda[clave.key]) {
          this.documentosBusqueda[clave.key] = busqueda[clave.key];
          this.documentosBusqueda[clave.key + '_total'] =
            busqueda[clave.key + '_total'];
        }
      });
    });
    // Si no hay documentos cargamos
    if (this.documentos === undefined || this.documentos?.length === 0) {
      this.cargarDocumentos();
    }
  }

  cargarDocumentos() {
    this.cargando = true;

    let filtros = new DocumentosFiltros();
    filtros.addTermino('');
    this.documentoService.buscar(filtros).subscribe(
      (x) => {
        this.cargando = false;
      },
      () => (this.cargando = false)
    );
  }

  nuevoDocumento: Documento = {} as Documento;
  crear() {
    this.nuevoDocumento = {} as Documento;
    this.modalService.open(this.idModalCrear);
  }

  eliminado(doc: Documento) {
    this.documentos = this.documentos.filter((x) => x._id !== doc._id);
  }
  guardado(doc: Documento) {
    const index = this.documentos.findIndex((x) => x._id === doc._id);

    if (index < 0) this.documentos.push(doc);
    else this.documentos[index] = doc;

    //Si esta abierto el modal lo cerramos
    this.modalService.close(this.idModalCrear);
  }

  clavesResultadoBusqueda = [
    {
      key: Opciones.todosLosTerminosExactos,
      titulo: 'Todos los terminos exactos',
      descripcion:
        'Deben existir todos los terminos de manera exacta en cada punto para mostrar coincidencia',
    },
    {
      key: Opciones.todosLosTerminosParcial,
      titulo: 'Todos los terminos de manera parcial',
      descripcion:
        'Busca el termino de manera paracial y deben existir todas las coincidencias en el punto para mostrarlo.',
    },
    {
      key: Opciones.palabraCompleta,
      titulo: 'Palabra completa',
      descripcion: 'Busca la palabra completa en cada punto.',
    },
    {
      key: Opciones.palabraParcial,
      titulo: 'Palabra parcial',
      descripcion: 'Busca los terminos de manera parcial en cada punto',
    },
    {
      key: Opciones.puntos,
      titulo: 'Coincidencia en puntos',
      descripcion:
        'Busca los puntos que que coincidan con el formato. Puede ser "21, 23-30"',
    },
  ];

  cargarDocumentosConPaginacion(paginacion: Paginacion, key: any) {
    //Modificamos los filtros globales.
    this.documentoService.filtros
      .setLimit(paginacion.limit)
      .setSkip(paginacion.skip);

    this.paginadorService.registro(key).cargando = true;
    this.documentoService.buscar(this.documentoService.filtros, key).subscribe(
      () => (this.paginadorService.registro(key).cargando = false),
      () => (this.paginadorService.registro(key).cargando = false)
    );
  }

  /**
   *Si los filtros tienen definido esta key, se muestra
   los datos
   *
   * @param {Opciones} key
   * @returnsK bolean
   * @memberof DocumentosComponent
   */
  estaEnFiltros(key: Opciones) {
    let a = this.documentoService.filtros.opciones;
    return a.includes(key);
  }
}
