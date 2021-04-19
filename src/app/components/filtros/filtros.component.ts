import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@codice-progressio/modal';
import { DocumentosFiltros } from 'src/app/services/documento.service';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private documentoService: DocumentoService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  idModal = 'modalDeFiltros';
  buscando = false;

  opciones: Opcion[] = [
    {
      descripcion: 'Todos los términos exactos',
      opcion: 'todosLosTerminosExactos',
      seleccionado: true,
    },
    {
      descripcion: 'Todos los terminos de manera parcial',
      opcion: 'todosLosTerminosParcial',
      seleccionado: false,
    },
    {
      descripcion: 'Palabra parcial',
      opcion: 'palabraParcial',
      seleccionado: false,
    },
    {
      descripcion: 'Palabra completa',
      opcion: 'palabraCompleta',
      seleccionado: false,
    },
  ];

  buscador(termino: string) {
    let terminoLimpio = termino.trim();
    if (!terminoLimpio) return;
    this.buscando = true;

    let filtros = new DocumentosFiltros();
    filtros.addTermino(termino).setLimit(5).setSkip(0);

    this.opciones.forEach((x) => {
      if (x.seleccionado) filtros.addOpciones(x.opcion);
    });

    this.documentoService.buscar(filtros).subscribe(
      (docs) => {
        //No es necesario obtener los documentos aqui
        // por que se muestran en otro componente
        this.buscando = false;
        this.router.navigate(['documentos']);
      },
      () => (this.buscando = false)
    );
  }

  abrirModal(id: string) {
    this.modalService.open(id);
  }
}

interface Opcion {
  opcion:
    | 'todosLosTerminosExactos'
    | 'todosLosTerminosParcial'
    | 'palabraParcial'
    | 'palabraCompleta';

  descripcion: string;
  seleccionado: boolean;
}
