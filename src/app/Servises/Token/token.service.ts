import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private apiUrl = 'https://gatewayapi.eniac-tech.com/api/v1/token';
  private username = 'hyper_family';
  private password = '*_z;sZ}MX;xB{92h';

  constructor(private http: HttpClient) {}

  getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error retrieving token:', error);
        return throwError(() => error);
      })
    );
  }
}
