import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Documento, Punto } from '../../models/documento.model';

@Component({
  selector: 'app-documento-visor',
  templateUrl: './documento-visor.component.html',
  styleUrls: ['./documento-visor.component.css'],
})
export class DocumentoVisorComponent implements OnInit {
  cargando: boolean = false;
  cargandoPuntos: boolean = false;
  documento: Documento;
  puntos: Punto[] = [];
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
        this.puntos = p;
      },
      () => (this.cargandoPuntos = false)
    );
  }

  agregarPunto() {
    this.puntos.push({} as Punto);
    console.log(this.puntos)
  }
}
