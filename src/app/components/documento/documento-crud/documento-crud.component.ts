import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InputValidacionesService } from '@codice-progressio/input-validaciones';
import { Documento } from '../../../models/documento.model';
import { DocumentoService } from '../../../services/documento.service';

@Component({
  selector: 'app-documento-crud',
  templateUrl: './documento-crud.component.html',
  styleUrls: ['./documento-crud.component.css'],
})
export class DocumentoCrudComponent implements OnInit {
  idGenerado = 'DOC_CRUD_' + Math.round(Math.random() * 1000000);
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
    if (value?.editando !== undefined) this.editando = value?.editando ?? false;
    this.crearFormulario(value.documento);
  }

  @Output() eliminado = new EventEmitter<Documento>();
  @Output() guardado = new EventEmitter<Documento>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    public vs: InputValidacionesService,
    public docService: DocumentoService
  ) {}

  formulario: FormGroup;

  ngOnInit(): void {}

  crearFormulario(doc: Partial<Documento>) {
    this.formulario = new FormGroup({
      _id: new FormControl(doc._id),
      nombre: new FormControl(doc.nombre, [Validators.required]),
      descripcion: new FormControl(doc.descripcion, [Validators.required]),
    });

    this.protocoloDetalle(this.editando);
  }

  f(x: string) {
    return this.formulario.get(x);
  }

  protocoloDetalle(editando: boolean) {
    // setTimeout(() => {
    //   Array.from(
    //     document.querySelectorAll(
    //       `#${this.idGenerado} .documento-crud-elemento`
    //     )
    //   ).forEach((x) => {
    //     if (editando) this.renderer.removeClass(x, 'mostrar-detalle');
    //     else this.renderer.addClass(x, 'mostrar-detalle');
    //   });
    // }, 50);
  }

  editar() {
    this.editando = !this.editando;
  }

  eliminar() {
    this.cargando = true;
    this.docService.eliminar(this.datos.documento._id).subscribe(
      (d) => {
        this.cargando = false;
        this.eliminado.emit(this.datos.documento);
      },
      () => (this.cargando = false)
    );
  }

  guardar(model: Documento, invalid: boolean) {
    this.formulario.markAllAsTouched();
    this.formulario.updateValueAndValidity();
    if (invalid) return;

    this.cargando = true;
    this.docService.guardarModificar(model).subscribe(
      (d) => {
        this.cargando = false;
        this.datos.documento = d;
        this.editando = false;
        this.guardado.emit(d);
      },
      () => (this.cargando = false)
    );
  }

  leer() {
    this.router.navigate(['documento', this.datos.documento.url]);
  }
}

interface Datos {
  documento: Documento;
  editando: boolean;
  terminos: string[];
}
