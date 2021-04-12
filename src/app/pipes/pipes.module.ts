import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResaltarTerminosPipe } from './resaltar-terminos.pipe';

@NgModule({
  declarations: [ResaltarTerminosPipe],
  imports: [CommonModule],
  exports: [ResaltarTerminosPipe],
})
export class PipesModule {}
