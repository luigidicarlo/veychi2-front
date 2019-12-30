import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loggedIn = false;

  URI = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }

  login(user: {username: string, password: string}): Observable<Response> {
    return this.http.post<Response>(
      this.URI + '/login',
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    );
  }

  getLoggedUser(token: string): Observable<Response> {
    return this.http.get<Response>(
      this.URI + '/users',
      { headers: new HttpHeaders({ Authorization: token }) }
    );
  }

  saveSession(token: string) {
    localStorage.setItem('auth', token);
  }

  loadSession() {
    return localStorage.getItem('auth');
  }

  deleteSession() {
    localStorage.removeItem('auth');
  }

}
