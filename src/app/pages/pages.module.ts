import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TableroComponent } from './tablero/tablero.component';
import { ComponentsModule } from '../components/components.module';
import { ModalModule } from '@codice-progressio/modal';
import { DocumentoVisorComponent } from './documento-visor/documento-visor.component';

const routes: Routes = [
  { path: 'tablero', component: TableroComponent },
  { path: 'documento/:urlDoc', component: DocumentoVisorComponent },
  { path: 'documentos', component: DocumentosComponent },
  {
    path: '',
    redirectTo: '/tablero',
    pathMatch: 'full',
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('./administrador/administrador.module').then(
        (m) => m.AdministradorModule
      ),
  },
];

@NgModule({
  declarations: [
    PagesComponent,
    DocumentosComponent,
    TableroComponent,
    DocumentoVisorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalModule,
  ],
})
export class PagesModule {}
