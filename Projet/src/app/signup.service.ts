
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/signup'; // Assurez-vous que l'URL correspond à votre backend

  constructor(private http: HttpClient) {}

  signup(username: string, email: string, password: string): Observable<any> {
    const userData = { username, email, password };
    return this.http.post<any>(this.apiUrl, userData);
  }
}
