import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getApiMessage(): Observable<string> {
    return this.httpClient
      .get<{ message: string }>('http://localhost:3333/api')
      .pipe(map((x) => x.message));
  }
}
