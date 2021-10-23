import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Repescs } from '../models/repescs';
import { APP_CONFIG, AppConfig } from './../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class RepescsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  public getRepescsByICode(code: string): Observable<Repescs> {
    return this.httpClient.get<Repescs>(`${this.config.api}/repescs/${code}`)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  public update(id: string, params: Partial<Repescs>) {
    return this.httpClient.put(`${this.config.api}/repescs/${id}`, params)
      .pipe(
        retry(),
        catchError(this.handleError))
  }

  public getAllRepescs(): Observable<Repescs[]> {
    return this.httpClient.get<Repescs[]>(`${this.config.api}/repescs`)
      .pipe(
        retry(2),
        catchError(this.handleError))

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
