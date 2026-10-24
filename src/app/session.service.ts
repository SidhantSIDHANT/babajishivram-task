import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}

  getDropdown<T>(body: T | null, url: string): Observable<T> {
    return this.http.get<T>(`${environment.api}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  add<T>(body: T | null, url: string): Observable<T> {
    return this.http.post<T>(`${environment.api}/${url}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  update<T>(body: T | null, url: string): Observable<T> {
    return this.http.put<T>(`${environment.api}/${url}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  delete<T>(body: T | null, url: string): Observable<T> {
    return this.http.delete<T>(`${environment.api}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  list<T>(body: T | null, url: string) {
    return this.http.get<T>(`${environment.api}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getTaskById<T>(body: T | null, url: string) {
     return this.http.get<T>(`${environment.api}/${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
