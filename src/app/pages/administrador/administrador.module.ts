import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent }
];

@NgModule({
  declarations: [AdministradorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdministradorModule { }
