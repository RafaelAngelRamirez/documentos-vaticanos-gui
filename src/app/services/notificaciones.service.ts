import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  toast: Toast;
  constructor(public toastr: ToastrService) {
    this.toast = new Toast(this);
  }
}

class Toast {
  constructor(private root: NotificacionesService) {}

  error(msj: string, titulo?: string) {
    this.root.toastr.error(msj, titulo);
  }
  correcto(msj: string, titulo?: string) {
    this.root.toastr.success(msj, titulo);
  }
}
