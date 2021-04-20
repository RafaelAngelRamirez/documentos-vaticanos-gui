import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResaltarTerminosPipe } from './resaltar-terminos.pipe';
import { TieneElPermisoPipe } from './tiene-el-permiso.pipe';

@NgModule({
  declarations: [ResaltarTerminosPipe, TieneElPermisoPipe],
  imports: [CommonModule],
  exports: [ResaltarTerminosPipe, TieneElPermisoPipe],
})
export class PipesModule {}
