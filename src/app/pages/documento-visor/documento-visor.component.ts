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
        this.puntos = [];

        p.map(this.transformarPuntos).forEach((x) => {
          setTimeout(() => {
            this.puntos.push(x);
          }, 10);
        });
      },
      () => (this.cargandoPuntos = false)
    );
  }

  agregarPunto() {
    this.puntos.unshift({
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

  guardado(contenido: string, i: number) {
    // this.puntos[i].editando = false;
    // this.puntos[i].punto.contenido = contenido
  }

  eliminado(i: number) {
    this.puntos.splice(i, 1);
  }
}

interface PuntoWrapper {
  punto: Punto;
  documento: Documento;
  editando: boolean;
}
