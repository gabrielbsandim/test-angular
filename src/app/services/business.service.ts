import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IBusiness } from '../models/business.model';
import { IFakeStoreBusinessResponse } from '../models/fakeActions.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }

  public fetchAllBusiness(): Observable<IBusiness[]> {
    return this.httpClient.get<IBusiness[]>(environment.fetchBusinessBaseUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  public fetchOneBusiness(businessId: string): Observable<IBusiness> {
    return this.httpClient
      .get<IBusiness>(`${environment.fetchBusinessBaseUrl}/${businessId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // salvamento fake do Polo com retorno
  public storeBusiness(business: IBusiness): IFakeStoreBusinessResponse {
    if (!business) {
      return {
        status: false,
        message: $localize`Erro ao salvar o Polo`
      }
    }

    console.log($localize`Polo salvo!`);
    console.log(business);
    return {
      status: true,
      message: $localize`Polo salvo com sucesso`
    }
  }

  // resposta de erro para a chamada
  private handleError(error: HttpErrorResponse) {
    console.error(
      $localize`Backend retornou o código: ${error.status}, e no corpo: ${error.error}`);

    return throwError(
      $localize`Ocorreu um erro na requisição`);
  }
}
