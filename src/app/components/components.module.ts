import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCrudComponent } from './documento/documento-crud/documento-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidacionesModule } from '@codice-progressio/input-validaciones';
import { AutosizeModule } from 'ngx-autosize';
import { PuntoCrudComponent } from './documento/punto-crud/punto-crud.component';

@NgModule({
  declarations: [DocumentoCrudComponent, PuntoCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidacionesModule,
    AutosizeModule,
  ],
  exports: [DocumentoCrudComponent, PuntoCrudComponent],
})
export class ComponentsModule {}
