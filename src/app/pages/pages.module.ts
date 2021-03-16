import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { TableroComponent } from './tablero/tablero.component';
import { ComponentsModule } from '../components/components.module';
import { ModalModule } from '@codice-progressio/modal';

const routes: Routes = [
  { path: 'tablero', component: TableroComponent },
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
  declarations: [PagesComponent, DocumentosComponent, TableroComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    ModalModule,
  ],
})
export class PagesModule {}
