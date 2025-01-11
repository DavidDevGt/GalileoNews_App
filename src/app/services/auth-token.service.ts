import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Disponible en toda la aplicación
})
export class AuthTokenService {
  private token: string | null = null;

  // Guardar el token
  setToken(token: string): void {
    this.token = token;
  }

  // Obtener el token
  getToken(): string | null {
    return this.token;
  }

  // Limpiar el token
  clearToken(): void {
    this.token = null;
  }
}
