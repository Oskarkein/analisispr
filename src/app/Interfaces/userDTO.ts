export interface Usuario {
  id?: number;
  usuario: string;
  nombre: string;
  password?: string;
  idRol: number;
  correo: string;
  telefono: string;
  rol?: string; 
}