import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class singUp {
  private readonly endpoint: string = `${environment.URL_API}/users/create`;

  constructor(private http: HttpClient, private router: Router) {}

  createUser(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(this.endpoint, userData);
  }
}
