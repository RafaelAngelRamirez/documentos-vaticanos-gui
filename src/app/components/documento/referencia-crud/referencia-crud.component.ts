import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InputValidacionesService } from '@codice-progressio/input-validaciones';
import {
  Referencia,
  DocumentoSimple,
  Documento,
  Punto,
} from '../../../models/documento.model';
import { DocumentoService } from '../../../services/documento.service';

@Component({
  selector: 'app-referencia-crud',
  templateUrl: './referencia-crud.component.html',
  styleUrls: ['./referencia-crud.component.css'],
})
export class ReferenciaCrudComponent implements OnInit {
  private _datos: Datos;
  private _cargando: boolean;

  public get cargando(): boolean {
    return this._cargando;
  }

  public set cargando(value: boolean) {
    this._cargando = value;

    if (value) this.formulario?.disable();
    else this.formulario?.enable();
  }

  public get datos(): Datos {
    return this._datos;
  }
  @Input()
  public set datos(value: Datos) {
    this._datos = value;

    this.crearFormulario(value.referencia);
  }

  formulario: FormGroup;
  editando = false;

  @Input() mostrarEliminar = false;

  @Output() eliminado = new EventEmitter<null>();

  constructor(
    private documentoService: DocumentoService,
    public vs: InputValidacionesService
  ) {}

  ngOnInit(): void {}

  crearFormulario(r: Referencia) {
    this.formulario = new FormGroup({
      _id: new FormControl(r._id),
      descripcion: new FormControl(r.descripcion?.trim()),
      url: new FormControl(r.url?.trim()),
    });
  }

  f(c: string) {
    return this.formulario.get(c);
  }

  guardar(model: Referencia, invalid: boolean) {
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();
    if (invalid) {
      return;
    }
    this.cargando = true;

    let doc: DocumentoSimple = {
      _id: this.datos.documento._id,
      punto: {
        _id: this.datos.punto._id,
        referencia: model,
      },
    };

    if (!model._id) {
      this.documentoService.punto.referencia.nuevo(doc).subscribe(
        (data) => {
          this.cargando = false;
          this.editando = false;
          this.datos.referencia.descripcion = doc.punto.referencia.descripcion;
          this.datos.referencia.url = doc.punto.referencia.url;
        },
        () => (this.cargando = false)
      );
    } else {
      this.documentoService.punto.referencia.modificar(doc).subscribe(
        (data) => {
          this.cargando = false;
          this.editando = false;
          this.datos.referencia.descripcion = doc.punto.referencia.descripcion;
          this.datos.referencia.url = doc.punto.referencia.url;
        },
        () => (this.cargando = false)
      );
    }
  }

  eliminar() {
    if (!this.datos.referencia._id) {
      this.eliminado.emit();
      return;
    }

    this.cargando = true;

    this.documentoService.punto.referencia
      .eliminar({
        _id: this.datos.documento._id,
        punto: {
          _id: this.datos.punto._id,
          referencia: {
            _id: this.datos.referencia._id,
          } as Referencia,
        },
      })
      .subscribe(
        () => {
          this.cargando = false;

          this.eliminado.emit();
        },
        () => (this.cargando = false)
      );
  }

  abrirUrl() {}
}

interface Datos {
  documento: Documento;
  punto: Punto;
  referencia: Referencia;
}
