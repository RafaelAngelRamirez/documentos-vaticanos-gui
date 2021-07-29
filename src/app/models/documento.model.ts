export interface Documento {
  _id: string;
  nombre: string;
  _nombre: string;
  puntos: Punto[];
  indice: [
    {
      nombre: {
        type: string;
        required: [true, 'Debes definir el nombre del indice'];
      };
      // Aqui debe de ir referenciado cada id de punto que esta relacionado.
      puntos: [string];
    }
  ];
  descripcion: string;
  _descripcion: string;
  url: string;
}
export interface DocumentoSimple {
  _id?: string;
  nombre?: string;
  _nombre?: string;
  punto?: PuntoSimple;
  descripcion?: string;
  _descripcion?: string;
}

export interface Punto {
  _id: string;
  consecutivo: string;
  contenido: string;
  _contenido: string;
  revisado: boolean;
  // Solo para la interfaz
  contenidoSeparado: string[];
  _contenidoSeparado: string[];
  // Debe respetar el orden de aparicion en el texto.
  referencias: Referencia[];
}
export interface PuntoSimple {
  _id: string;
  consecutivo?: string;
  contenido?: string;
  // Debe respetar el orden de aparicion en el texto.
  referencia?: Referencia;
  revisado?: boolean;
}

export interface Referencia {
  _id: string;
  descripcion: string;
  url: string;
  local: {
    idDocumento: string;
    idPunto: string;
  };
}
