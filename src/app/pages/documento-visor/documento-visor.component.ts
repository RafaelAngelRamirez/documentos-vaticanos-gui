import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Documento, Punto, PuntoSimple } from '../../models/documento.model';

@Component({
  selector: 'app-documento-visor',
  templateUrl: './documento-visor.component.html',
  styleUrls: ['./documento-visor.component.css'],
})
export class DocumentoVisorComponent implements OnInit {
  cargando: boolean = false;
  cargandoPuntos: boolean = false;
  documento: Documento;
  puntos: PuntoWrapper[] = [];
  constructor(
    private documentoService: DocumentoService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) =>
      this.cargarDocumento(p.get('urlDoc'))
    );
  }

  cargarDocumento(url: string) {
    this.cargando = true;
    this.documentoService.buscarPorUrl(url).subscribe(
      (d) => {
        this.documento = d;
        this.cargando = false;

        this.obtenerPuntos(d._id);
      },

      () => (this.cargando = false)
    );
  }

  obtenerPuntos(_id: string) {
    this.cargandoPuntos = true;
    this.documentoService.obtenerPuntos(_id).subscribe(
      (p) => {
        this.cargandoPuntos = false;
        this.puntos = p.map(this.transformarPuntos);

        console.log(p);
      },
      () => (this.cargandoPuntos = false)
    );
  }

  agregarPunto() {
    this.puntos.push({
      punto: {} as Punto,
      editando: true,
      documento: this.documento,
    });
  }

  transformarPuntos = (x) => {
    return {
      documento: this.documento,
      punto: x,
      editando: false,
    };
  };

  guardado(doc: Documento) {
    this.puntos = doc.puntos.map(this.transformarPuntos)
  }

  eliminado(doc: PuntoSimple) {
    this.puntos = this.puntos.filter((x) => x.punto._id !== doc._id);
  }
}

interface PuntoWrapper {
  punto: Punto;
  documento: Documento;
  editando: boolean;
}
