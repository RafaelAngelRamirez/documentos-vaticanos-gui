import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@codice-progressio/modal';
import { Documento } from '../../models/documento.model';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css'],
})
export class DocumentosComponent implements OnInit {
  constructor(
    private router: Router,
    private documentoService: DocumentoService,
    private modalService: ModalService
  ) {}

  documentos: Documento[] = [];
  idModalCrear = 'idModalCrear';
  ngOnInit(): void {
    this.documentoService.documentos.subscribe((x) => (this.documentos = x));
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
}
