import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../../services/documento.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Documento } from '../../models/documento.model'

@Component({
  selector: 'app-documento-visor',
  templateUrl: './documento-visor.component.html',
  styleUrls: ['./documento-visor.component.css'],
})
export class DocumentoVisorComponent implements OnInit {
  cargando: boolean = false
  documento:Documento
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

  cargarDocumento(url:string) {
    this.cargando = true;
    this.documentoService.buscarPorUrl(url).subscribe(d=>{
      this.documento = d
      this.cargando = false
      console.log(d)

    }, ()=> this.cargando = false)
  }
}
