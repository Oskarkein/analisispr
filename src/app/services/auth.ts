import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Interfaces/userDTO'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) { }

  // Metodo para el Registro
  registrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, usuario);
  }

  // Metodo para el Login
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credenciales);
  }

  resetPassword(correo: string, nuevaPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password`, { correo, nuevaPassword });
  }
}