import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBusiness } from '../models/business.model';

export interface IFakeStoreBusinessResponse {
  status: boolean
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private httpClient: HttpClient) { }

  public fetchAllBusiness(): Observable<IBusiness[]> {
    return this.httpClient.get<IBusiness[]>(environment.fetchBusinessBaseUrl);
  }

  public fetchOneBusiness(businessId: string): Observable<IBusiness> {
    return this.httpClient
      .get<IBusiness>(`${environment.fetchBusinessBaseUrl}/${businessId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public storeBusiness(business: IBusiness): IFakeStoreBusinessResponse {
    if (!business) {
      return {
        status: false,
        message: 'Erro ao salvar o Polo'
      }
    }

    console.log('Polo salvo!');
    console.log(business);
    return {
      status: true,
      message: 'Polo salvo com sucesso!'
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);

    return throwError(
      'Ocorreu um erro ao buscar o Polo');
  }
}
