import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from 'src/app/config/app-config';
import { Customers } from 'src/app/models/customers'
import { retry, catchError, delay } from 'rxjs/operators';
import { FormaData } from '../_helpers/format.data';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private helpers: FormaData
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  }


  public getAllCustomers(): Observable<Customers[]> {
    return this.httpClient.get<Customers[]>(`${this.config.api}/customers`)
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError))
  }

  public generateOneCustomer() {
    return this.httpClient.post<Customers>(`${this.config.api}/customers`, {})
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

  public generateCustomer(code: string) {
    return this.httpClient.post<Customers>(`${this.config.api}/customers/automatic`, { repesc: code })
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

  public sharedWithUser(request: any) {
    return this.httpClient.post<Customers>(`${this.config.api}/customers/shared`, {request})
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

  public deleteCustomer(id?: string) {
    return this.httpClient.delete<Customers>(`${this.config.api}/customers/${id}`)
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

  public updateCustomers(id: string, requestBody: Partial<Customers>) {
    return this.httpClient.put<Customers>(`${this.config.api}/customers/${id}`, requestBody)
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

}