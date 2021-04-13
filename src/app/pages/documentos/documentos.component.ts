import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@codice-progressio/modal';
import { Documento } from '../../models/documento.model';
import { DocumentosBusqueda } from '../../services/documento.service';
import {
  DocumentoService,
  DocumentosFiltros,
} from '../../services/documento.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  constructor(
    private router: Router,
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
    this.documentoService.documentosBusqueda.subscribe((x) => {
      this.documentos = x.documentos;
      this.documentosBusqueda = x;
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
      key: 'todosLosTerminosExactos',
      titulo: 'Todos los terminos exactos',
      descripcion:
        'Deben existir todos los terminos de manera exacta en cada punto para mostrar coincidencia',
    },
    {
      key: 'todosLosTerminosParcial',
      titulo: 'Todos los terminos de manera parcial',
      descripcion:
        'Busca el termino de manera paracial y deben existir todas las coincidencias en el punto para mostrarlo.',
    },
    {
      key: 'palabraCompleta',
      titulo: 'Palabra completa',
      descripcion: 'Busca la palabra completa en cada punto.',
    },
    {
      key: 'palabraParcial',
      titulo: 'Palabra parcial',
      descripcion: 'Busca los terminos de manera parcial en cada punto',
    },
  ];

  obtenerTotal(key: string) {
    return this.documentosBusqueda[key + '_total']?.pop()?.total ?? 0;
  }
}
