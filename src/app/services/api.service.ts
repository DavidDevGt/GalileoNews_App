import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api-galileojs.davidwebgt.com'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método POST (REGISTER NEW USER)
  postDataLogin(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  // Método GET (REGISTER NEW USER)
  getData(endpoint: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers });
  }

  // Método POST
  postData(endpoint: string, token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

  // Método PUT
  putData(endpoint: string, token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

  // Método DELETE
  deleteData(endpoint: string, token: string, data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${endpoint}`, { headers, body: data });
  }

}
