import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCrudComponent } from './documento/documento-crud/documento-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidacionesModule } from '@codice-progressio/input-validaciones';
import { AutosizeModule } from 'ngx-autosize';
import { PuntoCrudComponent } from './documento/punto-crud/punto-crud.component';
import { ReferenciaCrudComponent } from './documento/referencia-crud/referencia-crud.component';
import { PipesModule } from '../pipes/pipes.module';
import { PaginadorComponent } from './paginador/paginador.component';

@NgModule({
  declarations: [
    DocumentoCrudComponent,
    PuntoCrudComponent,
    ReferenciaCrudComponent,
    PaginadorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidacionesModule,
    AutosizeModule,
    PipesModule,
  ],
  exports: [
    DocumentoCrudComponent,
    PuntoCrudComponent,
    ReferenciaCrudComponent,
    PaginadorComponent,
  ],
})
export class ComponentsModule {}
