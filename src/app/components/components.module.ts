import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCrudComponent } from './documento/documento-crud/documento-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidacionesModule } from '@codice-progressio/input-validaciones';

@NgModule({
  declarations: [DocumentoCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidacionesModule,
  ],
  exports: [DocumentoCrudComponent],
})
export class ComponentsModule {}
