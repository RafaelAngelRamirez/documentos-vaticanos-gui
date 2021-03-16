import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoCrudComponent } from './documento/documento-crud/documento-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputValidacionesModule } from '@codice-progressio/input-validaciones';
import {AutosizeModule} from 'ngx-autosize';
import { DocumentoPuntoComponent } from './documento-punto/documento-punto.component';

@NgModule({
  declarations: [DocumentoCrudComponent, DocumentoPuntoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputValidacionesModule,
    AutosizeModule
  ],
  exports: [DocumentoCrudComponent],
})
export class ComponentsModule {}
