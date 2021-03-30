import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputValidacionesService } from '@codice-progressio/input-validaciones';
import { DocumentoService } from 'src/app/services/documento.service';
import { PuntoSimple } from '../../../models/documento.model';
import {
  Documento,
  DocumentoSimple,
  Punto,
  Referencia,
} from '../../../models/documento.model';

@Component({
  selector: 'app-punto-crud',
  templateUrl: './punto-crud.component.html',
  styleUrls: ['./punto-crud.component.css'],
})
export class PuntoCrudComponent implements OnInit {
  idGenerado = 'PUNTO_CRUD_' + Math.round(Math.random() * 1000000);
  private _cargando = false;
  public get cargando() {
    return this._cargando;
  }
  public set cargando(value) {
    this._cargando = value;
    value ? this.formulario?.disable() : this.formulario.enable();
  }
  private _editando = false;
  public get editando() {
    return this._editando;
  }
  public set editando(value) {
    this._editando = value;
    this.protocoloDetalle(value);
  }

  private _datos: Partial<Datos>;
  public get datos(): Partial<Datos> {
    return this._datos;
  }
  @Input()
  public set datos(value: Partial<Datos>) {
    this._datos = value;
    this.editando = value?.editando ?? false;
    this.protocoloReferencia(value.punto);
    this.crearFormulario(value.punto);
  }

  @Output() eliminado = new EventEmitter<string>();
  @Output() guardado = new EventEmitter<string>();

  mostrarReferencias = false;

  constructor(
    private el: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    public vs: InputValidacionesService,
    public docService: DocumentoService
  ) {}

  formulario: FormGroup;

  ngOnInit(): void {}

  crearFormulario(doc: Partial<Punto>) {
    this.formulario = new FormGroup({
      _id: new FormControl(doc?._id),
      consecutivo: new FormControl(doc?.consecutivo, [Validators.required]),
      contenido: new FormControl(doc?.contenido, [Validators.required]),
    });

    this.protocoloDetalle(this.editando);
  }

  f(x: string) {
    return this.formulario.get(x);
  }

  fa(x: string) {
    return this.f(x) as FormArray;
  }

  protocoloDetalle(editando: boolean) {
    setTimeout(() => {
      Array.from(
        document.querySelectorAll(`#${this.idGenerado} .punto-crud-elemento`)
      ).forEach((x) => {
        if (editando) this.renderer.removeClass(x, 'mostrar-detalle');
        else this.renderer.addClass(x, 'mostrar-detalle');
      });
    }, 50);
  }

  editar() {
    if (this.cargando) return;
    this.editando = !this.editando;
  }

  eliminar() {
    if (this.cargando) return;
    this.cargando = true;
    this.docService.punto
      .eliminar({
        _id: this.datos.documento._id,
        punto: this.formulario.value,
      })
      .subscribe(
        (d) => {
          this.cargando = false;
          this.eliminado.emit(this.formulario.value._id);
        },
        () => (this.cargando = false)
      );
  }

  guardar(punto: PuntoSimple, invalid: boolean) {
    if (this.cargando) return;
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();
    if (invalid) {
      const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
      invalidControl.focus();
      return;
    }

    const doc: DocumentoSimple = {
      _id: this.datos.documento._id,
      punto,
    };

    const resultado = (d) => {
      let nuevoContenido = this.formulario.get('contenido').value;
      this.datos.punto.contenido = nuevoContenido;
      this.protocoloReferencia(this.datos.punto);
      this.cargando = false;
      this.editando = false;
      this.guardado.emit(nuevoContenido);
    };

    const error = () => (this.cargando = false);

    this.cargando = true;
    if (punto._id) {
      this.docService.punto.modificar(doc).subscribe(resultado, error);
    } else {
      this.docService.punto.nuevo(doc).subscribe(resultado, error);
    }
  }

  protocoloReferencia(punto: Punto) {
    punto.contenidoSeparado = punto.contenido?.split('[+REF+]')?? [];
  }
}

interface Datos {
  documento: Documento;
  punto: Punto;
  editando: boolean;
}
