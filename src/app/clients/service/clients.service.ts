import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, delay, retry } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from 'src/app/config/app-config';
import { Customers } from 'src/app/models/customers';
import { FormaData } from 'src/app/_helpers/format.data';
import { ClientsRequest } from '../interfaces/clients-request';
import { Clients } from '../models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig,
    private helpers: FormaData
  ) {}

  public connectSim() {
    return this.httpClient.post<Clients>(`${this.config.api}/customers/connect/sim`,{})
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }

  public async checkIsCustumersInAppSim(data: any) {
    return this.httpClient.post<ClientsRequest>(`${this.config.api}/customers/app/sim`,{document: data.cpf, ...(data.campanha && {campanha: data.campanha}),appVersion: 'App Massa Repesc 1.0'})
      .pipe(
        retry(1), delay(600),
        catchError(this.helpers.handleError));
  }
}
