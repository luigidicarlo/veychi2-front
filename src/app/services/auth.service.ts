import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loggedIn = false;
  apiBase: 'http://localhost:3535';

  constructor(
    private http: HttpClient
  ) { }

  login(user: {username: string, password: string}): Observable<string> {
    return this.http.post<string>(
      this.apiBase + '/login',
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    );
  }

  getLoggedUser(token: string): Observable<User> {
    return this.http.get<User>(
      this.apiBase + '/users',
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
