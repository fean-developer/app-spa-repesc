import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from 'src/app/config/app-config';
import { Customers } from 'src/app/models/customers'
import { retry, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  }


  public getAllCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(`${this.config.api}/customers`)
      .pipe(
        retry(2), delay(600),
        catchError(this.handleError))

  }

  public generateOneCustomer() {
    return this.httpClient.post<Customers>(`${this.config.api}/customers`, {})
      .pipe(
        retry(1), delay(600),
        catchError(this.handleError));
  }

  public generateCustomer(code: string) {
    return this.httpClient.post<Customers>(`${this.config.api}/customers/automatic`, { repesc: code })
      .pipe(
        retry(1), delay(600),
        catchError(this.handleError));
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
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
