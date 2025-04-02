import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // API backend

  constructor(private http: HttpClient) {}

  login(user: {mail: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, user, { withCredentials: true });
  }

  register(user: { username: string; mail: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user, { withCredentials: true });
  }

  logout() {
    localStorage.removeItem('accessToken');
    return this.http.post(`${this.apiUrl}/auth/login`, { withCredentials: true });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

   // Vérifie si le token d'accès est expiré
   isTokenExpired(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return true;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor(new Date().getTime() / 1000)) >= expiry;
  }

  refreshToken(): Observable<string> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/refresh-token`, {}).pipe(
      catchError((error) => {
        console.error('Refresh Token error', error);
        return throwError(() => error);
      }),
      map((response) => response.accessToken)
    );
  }

  getUserInfo(): any {
    return { name: 'John Doe' };  // Exemple fictif
  }
}
