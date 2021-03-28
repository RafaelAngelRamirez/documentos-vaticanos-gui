import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InputValidacionesService } from '@codice-progressio/input-validaciones';
import { Referencia } from '../../../models/documento.model';

@Component({
  selector: 'app-referencia-crud',
  templateUrl: './referencia-crud.component.html',
  styleUrls: ['./referencia-crud.component.css'],
})
export class ReferenciaCrudComponent implements OnInit {
  private _referencia: Referencia;
  private _cargando: boolean;

  public get cargando(): boolean {
    return this._cargando;
  }

  public set cargando(value: boolean) {
    this._cargando = value;

    if (value) this.formulario?.disable();
    else this.formulario?.enable();
  }

  public get referencia(): Referencia {
    return this._referencia;
  }
  @Input()
  public set referencia(value: Referencia) {
    this._referencia = value;

    this.crearFormulario(value);
  }

  formulario: FormGroup;
  editando = false;

  constructor(public vs: InputValidacionesService) {}

  ngOnInit(): void {}

  crearFormulario(r: Partial<Referencia>) {
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
  }

  eliminar() {
    throw 'URL abierta';
  }


  abrirUrl(){



    
  }



}
