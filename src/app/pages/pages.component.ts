import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DocumentoService } from '../services/documento.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(
    private router: Router, 
    private activatedRouter: ActivatedRoute,
    private documentoService: DocumentoService) {}

  ngOnInit(): void {}

  buscando = false;

  buscador(termino: string) {
    let terminoLimpio = termino.trim();
    if (!terminoLimpio) return;
    this.buscando = true;

    this.documentoService.buscar(termino).subscribe(
      (docs) => {
        this.buscando = false;
        this.router.navigate(["documentos"])
      },
      () => (this.buscando = false)
    );
  }
}
