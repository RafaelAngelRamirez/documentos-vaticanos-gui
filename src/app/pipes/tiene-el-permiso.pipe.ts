import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'tienePermiso',
})
export class TieneElPermisoPipe implements PipeTransform {
  transform(permiso: string): boolean {
    return !environment.production;
  }
}
